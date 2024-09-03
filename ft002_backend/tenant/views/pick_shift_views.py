# from django.db import transaction
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# class PickShiftView(APIView):
#     def post(self, request, *args, **kwargs):
#         shift_id = request.data.get('shift_id')
#         staff_id = request.data.get('staff_id')

#         with transaction.atomic():
#             shift = Shift.objects.select_for_update().get(pk=shift_id, is_open=True)
#             staff = Staff.objects.get(pk=staff_id)
            
#             shift.staff = staff
#             shift.is_open = False
#             shift.status = 'pending'  # or 'accepted' based on your business logic
#             shift.save()

#             return Response({"message": "Shift picked successfully"})
