from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Member

from rest_framework import serializers
from .models import Staff, Customer
# from .models import User
from .models import Shift
# from .models import UserProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        try:
            member = user.member
            # Use the name field from the Member model
            token['name'] = member.name if member.name else user.username
            token['tenant'] = member.tenant.name if member.tenant else 'No Tenant'
            token['role'] = member.role
            # Include tenant_id in the token
            token['tenant_id'] = str(member.tenant.tenant_id) if member.tenant else None
        except Member.DoesNotExist:
            # Fallback if there's no linked Member instance
            token['name'] = user.username
            token['tenant'] = 'No Tenant'
            token['role'] = 'No Role'
            token['tenant_id'] = None

        return token


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'

# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = '__all__'