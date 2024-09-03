
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from ..models import Staff
from ..serializers import StaffSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method="post", 
    request_body=StaffSerializer, 
    responses={201: "Staff created successfully.", 400: "Invalid data provided."}
)
@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter("staff_id", openapi.IN_QUERY, description="The unique identifier for a staff member.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("first_name", openapi.IN_QUERY, description="The first name of the staff member.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("last_name", openapi.IN_QUERY, description="The last name of the staff member.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("email", openapi.IN_QUERY, description="The email address of the staff member.", type=openapi.TYPE_STRING, required=False),
        # Add other parameters as needed based on your model
    ],
    responses={200: "Details of the staff members.", 400: "Invalid parameters provided.", 404: "No staff found."},
)
@swagger_auto_schema(
    method="put",
    request_body=StaffSerializer,
    responses={
        200: "Staff updated successfully.",
        400: "Invalid data provided or staff_id is missing.",
        404: "No staff found with the given staff_id.",
    },
)
@swagger_auto_schema(
    method="delete",
    responses={
        204: "Staff deleted successfully.",
        400: "Invalid staff_id provided.",
        404: "No staff found with the given staff_id.",
    },
)
@api_view(["GET", "POST", "PUT", "DELETE"])
#@permission_classes([IsAuthenticated])
def staff_view(request):
    """
    View function to handle CRUD operations for staff.

    Supports GET, POST, PUT, DELETE HTTP methods for interacting with staff data.

    GET: Returns a list of all staff members if no parameters are provided. If parameters are provided, returns a list of staff members matching the parameters.
    POST: Creates a new staff member.
    PUT: Updates an existing staff member.
    DELETE: Deletes an existing staff member.

    Parameters:
    request (HttpRequest): The HTTP request object.

    Returns:
    HttpResponse: The HTTP response object.
    """

    #user_profile = request.user.userprofile
    #if user_profile.role not in ['admin', 'user']:
       # return Response({"message": "You don't have permission to access this."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        staff_id = request.GET.get('staff_id')
        first_name = request.GET.get('first_name')
        last_name = request.GET.get('last_name')
        email = request.GET.get('email')

        filters = {}
        if staff_id:
            filters['staff_id'] = staff_id
        
        if first_name:
            filters['first_name'] = first_name

        if last_name:
            filters['last_name'] = last_name
        
        if email:
            filters['email'] = email

        staffs = Staff.objects.filter(**filters)

        if staffs.exists():
            serializer = StaffSerializer(staffs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == "POST":
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            staff_member = Staff.objects.get(staff_id=request.data['staff_id'])
            serializer = StaffSerializer(staff_member, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Staff.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == "DELETE":
        try:
            staff_member = Staff.objects.get(staff_id=request.GET.get('staff_id'))
            staff_member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Staff.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    else:
        return Response({"message": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)