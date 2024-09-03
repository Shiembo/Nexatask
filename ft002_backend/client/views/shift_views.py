from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from ..models import Shift
from ..serializers import ShiftSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.exceptions import ParseError, ValidationError
# ShiftSerializer needs to be defined in your serializers.py file, corresponding to the Shifts model

@swagger_auto_schema(
    method="post", 
    request_body=ShiftSerializer, 
    responses={201: "Shift created successfully.", 400: "Invalid data provided."}
)
@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter("shift_id", openapi.IN_QUERY, description="The unique identifier for a shift.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("date", openapi.IN_QUERY, description="The date of the shift.", type=openapi.TYPE_STRING, required=False),
        openapi.Parameter("shift_name", openapi.IN_QUERY, description="The name of the shift.", type=openapi.TYPE_STRING, required=False),
        # Add other parameters as needed based on your model
    ],
    responses={200: "Details of the shifts.", 400: "Invalid parameters provided.", 404: "No shifts found."},
)
@swagger_auto_schema(
    method="put",
    request_body=ShiftSerializer,
    responses={
        200: "Shift updated successfully.",
        400: "Invalid data provided or shift_id is missing.",
        404: "No shift found with the given shift_id.",
    },
)
@swagger_auto_schema(
    method="delete",
    responses={
        204: "Shift deleted successfully.",
        400: "Invalid shift_id provided.",
        404: "No shift found with the given shift_id.",
    },
)
@api_view(["GET", "POST", "PUT", "DELETE"])
#@permission_classes([IsAuthenticated])
def shift_view(request):
    """
    View function to handle CRUD operations for shifts.

    Supports GET, POST, PUT, DELETE HTTP methods for interacting with shift data.

    GET: Returns a list of all shifts if no parameters are provided. If parameters are provided, returns a list of shifts matching the parameters.
    POST: Creates a new shift.
    PUT: Updates an existing shift.
    DELETE: Deletes an existing shift.

    Parameters:
    request (HttpRequest): The HTTP request object.

    Returns:
    HttpResponse: The HTTP response object.
    """
    if request.method in ['POST', 'PUT']:
        try:
            request_data = request.data
        except ParseError:
            return Response({"message": "Malformed request data."}, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'GET':
        shift_id = request.GET.get('shift_id')
        date = request.GET.get('date')
        shift_name = request.GET.get('shift_name')

        filters = {}
        if shift_id:
            filters['shift_id'] = shift_id
        if date:
            filters['date'] = date
        
        if shift_name:
            filters['shift_name'] = shift_name

        shifts_query = Shift.objects.filter(**filters)

        if shifts_query.exists():
            serializer = ShiftSerializer(shifts_query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No shifts found."}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        serializer = ShiftSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        shift_id = request_data.get('shift_id')
        if not shift_id:
            return Response({"message": "shift_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            shift = Shift.objects.get(shift_id=shift_id)
        except Shift.DoesNotExist:
            return Response({"message": "Shift not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ShiftSerializer(shift, data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        shift_id = request.GET.get('shift_id')
        if not shift_id:
            return Response({"message": "shift_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            shift = Shift.objects.get(shift_id=shift_id)
        except Shift.DoesNotExist:
            return Response({"message": "Shift not found."}, status=status.HTTP_404_NOT_FOUND)

        shift.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    else:
        # Handling unsupported request methods
        return Response({"message": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
