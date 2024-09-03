

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from ..models import Customer
from ..serializers import CustomerSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method="post", 
    request_body=CustomerSerializer, 
    responses={201: "Customer created successfully.", 400: "Invalid data provided."}
)
@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter("customer_id", openapi.IN_QUERY, description="The unique identifier for a customer.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("first_name", openapi.IN_QUERY, description="The first name of the customer.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("last_name", openapi.IN_QUERY, description="The last name of the customer.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("email", openapi.IN_QUERY, description="The email address of the customer.", type=openapi.TYPE_STRING, required=False),
        # Add other parameters as needed based on your model
    ],
    responses={200: "Details of the customers.", 400: "Invalid parameters provided.", 404: "No customers found."},
)
@swagger_auto_schema(
    method="put",
    request_body=CustomerSerializer,
    responses={
        200: "Customer updated successfully.",
        400: "Invalid data provided or customer_id is missing.",
        404: "No customer found with the given customer_id.",
    },
)
@swagger_auto_schema(
    method="delete",
    responses={
        204: "Customer deleted successfully.",
        400: "Invalid customer_id provided.",
        404: "No customer found with the given customer_id.",
    },
)

@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def customer_view(request):
    """
    View function to handle CRUD operations for customers.

    Supports GET, POST, PUT, DELETE HTTP methods for interacting with customer data.

    GET: Returns a list of all customers if no parameters are provided. If parameters are provided, returns a list of customers matching the parameters.
    POST: Creates a new customer.
    PUT: Updates an existing customer.
    DELETE: Deletes an existing customer.

    Parameters:
    request (HttpRequest): The HTTP request object.

    Returns:
    HttpResponse: The HTTP response object.
    """

    user_profile = request.user.userprofile
    if user_profile.role not in ['admin', 'user']:
        return Response({"message": "You don't have permission to access this."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":

        customer_id = request.GET.get('customer_id')
        first_name = request.GET.get('first_name')
        last_name = request.GET.get('last_name')
        email = request.GET.get('email')

        filters = {}

        if customer_id:
            filters['customer_id'] = customer_id
        
        if first_name:
            filters['first_name'] = first_name
        
        if last_name:
            filters['last_name'] = last_name
        
        if email:
            filters['email'] = email

        
        customers =Customer.objects.filter(**filters)

        if customers.exists():
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No customers found."}, status=status.HTTP_404_NOT_FOUND)



    elif request.method == "POST":
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            cust = Customer.objects.get(customer_id=request.data['customer_id'])
            serializer = CustomerSerializer(cust, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == "DELETE":
        try:
            cust = Customer.objects.get(customer_id=request.GET.get('customer_id'))
            cust.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    else:
        return Response({"message": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
