# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.http import JsonResponse
# from rest_framework.response import Response
# from rest_framework import status
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi
# from ..models import UserProfile
# from ..serializers import UserProfileSerializer  # This needs to be defined in your serializers.py
# from rest_framework.exceptions import ParseError

# @swagger_auto_schema(
#     method='post',
#     request_body=UserProfileSerializer,
#     responses={201: 'User profile created successfully.', 400: 'Invalid data provided.'}
# )
# @swagger_auto_schema(
#     method='get',
#     manual_parameters=[
#         openapi.Parameter('user_id', openapi.IN_QUERY, description='The unique identifier for a user.', type=openapi.TYPE_STRING, required=False),
#         openapi.Parameter('role', openapi.IN_QUERY, description='The role of the user.', type=openapi.TYPE_STRING, required=False),
#     ],
#     responses={200: 'Details of the user profiles.', 400: 'Invalid parameters provided.', 404: 'No user profiles found.'},
# )
# @swagger_auto_schema(
#     method='put',
#     request_body=UserProfileSerializer,
#     responses={
#         200: 'User profile updated successfully.',
#         400: 'Invalid data provided or user_id is missing.',
#         404: 'No user profile found with the given user_id.',
#     }
# )
# @swagger_auto_schema(
#     method='delete',
#     responses={
#         204: 'User profile deleted successfully.',
#         400: 'Invalid user_id provided.',
#         404: 'No user profile found with the given user_id.',
#     }
# )
# @api_view(['GET', 'POST', 'PUT', 'DELETE'])
# # @permission_classes([IsAuthenticated])  # Uncomment this line to enable authentication
# def user_profile_view(request):
#     """
#     View function to handle CRUD operations for user profiles.

#     Supports GET, POST, PUT, DELETE HTTP methods for interacting with user profile data.

#     GET: Returns a list of all user profiles if no parameters are provided. If parameters are provided, returns a list of user profiles matching the parameters.
#     POST: Creates a new user profile.
#     PUT: Updates an existing user profile.
#     DELETE: Deletes an existing user profile.
#     """
#     if request.method in ['POST', 'PUT']:
#         try:
#             request_data = request.data
#         except ParseError:
#             return Response({"message": "Malformed request data."}, status=status.HTTP_400_BAD_REQUEST)
        
#     if request.method == 'GET':
#         user_id = request.GET.get('user_id')
#         role = request.GET.get('role')

#         filters = {}
#         if user_id:
#             filters['user_id'] = user_id
#         if role:
#             filters['role'] = role

#         user_profiles = UserProfile.objects.filter(**filters)

#         if user_profiles.exists():
#             serializer = UserProfileSerializer(user_profiles, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response({"message": "No user profiles found."}, status=status.HTTP_404_NOT_FOUND)
    
#     elif request.method == 'POST':
#         serializer = UserProfileSerializer(data=request_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'PUT':
#         user_id = request_data.get('user_id')
#         if not user_id:
#             return Response({"message": "User_id is required."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             user_profile = UserProfile.objects.get(user_id=user_id)
#         except UserProfile.DoesNotExist:
#             return Response({"message": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

#         serializer = UserProfileSerializer(user_profile, data=request_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         user_id = request.GET.get('user_id')
#         if not user_id:
#             return Response({"message": "User_id is required."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             user_profile = UserProfile.objects.get(user_id=user_id)
#         except UserProfile.DoesNotExist:
#             return Response({"message": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

#         user_profile.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     else:
#         # Handling unsupported request methods
#         return Response({"message": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
