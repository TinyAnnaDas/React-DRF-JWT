from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.hashers import make_password

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'is_staff','is_active','image')

    def create(self, validated_data):
       
        user = User.objects.create_user(
            first_name = validated_data['first_name'], 
            last_name = validated_data['last_name'],
            email = validated_data['email'], 
            password = validated_data['password'],
        )  

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'is_staff','is_active','image', 'is_superuser')



class AdminUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'is_staff','is_active','image')

    def create(self, validated_data):
        image = validated_data.get('image', None)
        if image:
            user = User.objects.create(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                password=make_password(validated_data['password']),
                image=image,
            )
        else:
            user = User.objects.create(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                password=make_password(validated_data['password']),
            )
        
        return user