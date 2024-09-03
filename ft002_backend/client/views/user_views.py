# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from ..models import User
# from ..serializers import UserSerializer
# from rest_framework import status
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

# @swagger_auto_schema(
#     method="post", 
#     request_body=UserSerializer, 
#     responses={201: "User created successfully.", 400: "Invalid data provided."}
# )
# @swagger_auto_schema(
#     method="get",
#     manual_parameters=[
#         openapi.Parameter("user_id", openapi.IN_QUERY, description="The unique identifier for a user.", type=openapi.TYPE_STRING, required=False),
#         openapi.Parameter("username", openapi.IN_QUERY, description="The username of the user.", type=openapi.TYPE_STRING, required=False),
#         openapi.Parameter("email", openapi.IN_QUERY, description="The email address of the user.", type=openapi.TYPE_STRING, required=False),
#         openapi.Parameter("role", openapi.IN_QUERY, description="The role of the user.", type=openapi.TYPE_STRING, required=False),
#         # Add other parameters as needed based on your model
#     ],
#     responses={200: "Details of the users.", 400: "Invalid parameters provided.", 404: "No users found."},
# )
# @swagger_auto_schema(
#     method="put",
#     request_body=UserSerializer,
#     responses={
#         200: "User updated successfully.",
#         400: "Invalid data provided or user_id is missing.",
#         404: "No user found with the given user_id.",
#     },
# )
# @swagger_auto_schema(
#     method="delete",
#     responses={
#         204: "User deleted successfully.",
#         400: "Invalid user_id provided.",
#         404: "No user found with the given user_id.",
#     },
# )


# @api_view(["GET", "POST", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
# def user_view(request):
#     """
#     View function to handle CRUD operations for users.

#     Supports GET, POST, PUT, DELETE HTTP methods for interacting with user data.

#     GET: Returns a list of all users if no parameters are provided. If parameters are provided, returns a list of users matching the parameters.
#     POST: Creates a new user.
#     PUT: Updates an existing user.
#     DELETE: Deletes an existing user.

#     Parameters:
#     request (HttpRequest): The HTTP request object.

#     Returns:
#     HttpResponse: The HTTP response object.
#     """


#     user_profile = request.user.userprofile
#     if user_profile.role not in ['admin', 'user']:
#         return Response({"message": "You don't have permission to access this."}, status=status.HTTP_403_FORBIDDEN)


#     if request.method == "GET":
#         user_id = request.GET.get('user_id')
#         username = request.GET.get('username')
#         email = request.GET.get('email')
#         role = request.GET.get('role')

#         filters = {}
#         if user_id:
#             filters['user_id'] = user_id
#         if username:
#             filters['username__icontains'] = username
#         if email:
#             filters['email__icontains'] = email
#         if role:
#             filters['role'] = role

#         users = User.objects.filter(**filters)
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     elif request.method == "POST":
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == "PUT":
#         try:
#             user_instance = User.objects.get(user_id=request.data['user_id'])
#             serializer = UserSerializer(user_instance, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     elif request.method == "DELETE":
#         try:
#             user_instance = User.objects.get(user_id=request.GET.get('user_id'))
#             user_instance.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except User.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     else:
#         return Response({"message": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
