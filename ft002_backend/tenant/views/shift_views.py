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
from ..models import Tenant

@swagger_auto_schema(method='post', request_body=ShiftSerializer,
                     responses={201: "Shift created successfully.", 400: "Invalid data provided."})
@swagger_auto_schema(method='get', manual_parameters=[
    openapi.Parameter("shift_id", openapi.IN_QUERY, description="Unique identifier for a shift.", type=openapi.TYPE_STRING, required=False),
    openapi.Parameter("date", openapi.IN_QUERY, description="Date of the shift.", type=openapi.TYPE_STRING, required=False),
    openapi.Parameter("shift_name", openapi.IN_QUERY, description="Name of the shift.", type=openapi.TYPE_STRING, required=False),
    # You can add more parameters as needed.
], responses={200: ShiftSerializer(many=True), 400: "Invalid parameters.", 404: "No shifts found."})
@swagger_auto_schema(method='put', request_body=ShiftSerializer,
                     responses={200: "Shift updated successfully.", 400: "Invalid data.", 404: "Shift not found."})
@swagger_auto_schema(method='delete', responses={
    204: "Shift deleted successfully.", 400: "Invalid shift_id.", 404: "Shift not found."
})
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
#@permission_classes([IsAuthenticated])  # Uncomment or adjust according to your auth needs
def shift_view(request, shift_id=None):
    """
    Handles CRUD operations for Shifts in a multi-tenant environment.
    - GET: List or filter shifts based on query parameters.
    - POST: Create a new shift for the current tenant.
    - PUT: Update an existing shift.
    - DELETE: Delete a shift.
    """
    # Common filter setup for GET requests
    if request.method == 'GET':
        tenant_id = request.headers.get('X-Tenant-ID', None)
        if not tenant_id:
            return JsonResponse({"error": "Tenant ID is required."}, status=400)
        
        # Assuming a function that gets a tenant instance from tenant_id
        tenant_instance = get_tenant_instance(tenant_id)
        if not tenant_instance:
            return JsonResponse({"error": "Invalid Tenant ID."}, status=404)
        
        filters = {'tenant': tenant_instance}
        for param in ['shift_id', 'date', 'shift_name']:
            if request.GET.get(param):
                filters[param] = request.GET[param]

        shifts = Shift.objects.filter(**filters)
        if shifts.exists():
            serializer = ShiftSerializer(shifts, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({"message": "No shifts found."}, status=404)
    # Create a new shift
    elif request.method == 'POST':
        serializer = ShiftSerializer(data=request.data)
        if serializer.is_valid():
            # Manually assign the tenant before saving
            shift = serializer.save(tenant=request.tenant)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update an existing shift
    elif request.method == 'PUT':

        # Now using shift_id from the URL path
        if not shift_id:
            # This check becomes redundant if your URL pattern ensures shift_id is always provided for PUT
            return JsonResponse({"error": "Shift ID is required in the URL path."}, status=400)

        print("Request Data:", request.data) 
        # Extract tenant ID from the JSON payload
        tenant_id = request.data.get('tenant',)
        
        if not tenant_id:
            return JsonResponse({"error": "Tenant ID is required."}, status=400)

        # Assuming a function that gets a tenant instance from tenant_id
        tenant_instance = get_tenant_instance(tenant_id)
        if not tenant_instance:
            return JsonResponse({"error": "Invalid Tenant ID."}, status=404)

        try:
            shift_id = request.data.get('shift_id')
            if not shift_id:
                return JsonResponse({"error": "Shift ID is required."}, status=400)

            shift = Shift.objects.get(shift_id=shift_id, tenant=tenant_instance)
            serializer = ShiftSerializer(shift, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Shift.DoesNotExist:
            return JsonResponse({"message": "Shift not found."}, status=404)

    # Delete a shift
    elif request.method == 'DELETE':
        if not shift_id:
            return Response({"error": "Shift ID is required in the URL path."}, status=status.HTTP_400_BAD_REQUEST)

    tenant_id = request.headers.get('X-Tenant-ID', None)
    tenant_instance = get_tenant_instance(tenant_id)
    if not tenant_instance:
        return Response({"error": "Invalid Tenant ID."}, status=status.HTTP_404_NOT_FOUND)

    try:
        shift = Shift.objects.get(pk=shift_id, tenant=tenant_instance)  # Use the `pk` argument to match the `shift_id`
        shift.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Shift.DoesNotExist:
        return Response({"message": "Shift not found."}, status=status.HTTP_404_NOT_FOUND)




def get_tenant_instance(tenant_id):
    try:
        return Tenant.objects.get(tenant_id=tenant_id)
    except Tenant.DoesNotExist:
        return None
