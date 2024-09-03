from django.http import JsonResponse
from ..models import Shift, Tenant  # Assuming you have a Tenant model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def book_shift(request, shift_id):
    print(request.data)  
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
    
    tenant_id = request.data.get('tenant_id')  # Extract tenant_id from request data
    if not tenant_id:
        return Response({"error": "No tenant ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Assuming your Shift model has a tenant field to link to the Tenant model
        tenant = Tenant.objects.get(id=tenant_id)  # Validate the tenant_id
    except Tenant.DoesNotExist:
        return Response({"error": "Invalid tenant ID"}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        shift = Shift.objects.get(pk=shift_id, tenant=tenant)  # Also filter by tenant
        if shift.status == 'pending':
            shift.status = 'accepted'
            shift.save(update_fields=['status'])
            return Response({"message": "Shift booked successfully."})
        else:
            return Response({"error": "Shift cannot be booked. It's not in pending status."}, status=status.HTTP_400_BAD_REQUEST)
    except Shift.DoesNotExist:
        return Response({"error": "Shift not found"}, status=status.HTTP_404_NOT_FOUND)
