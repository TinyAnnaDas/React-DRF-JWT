
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserSerializer, AdminUserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        print(data)

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        
        user = serializer.create(serializer.validated_data)
       
        user = UserSerializer(user)
       
        return Response(user.data, status=status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        user = UserSerializer(user)
       
        return Response(user.data, status=status.HTTP_200_OK)


class UploadImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def put(self, request, format=None):
        data = request.data["image"]
        user = request.user
        user.image = data
        user.save()
        user = UserSerializer(user)
        return Response(user.data, status = status.HTTP_200_OK)


class UserDetailsView(APIView):
    print("tiny")
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
    
        user = User.objects.exclude(is_superuser=True)
        user = UserSerializer(user, many=True)

        return Response(user.data, status = status.HTTP_200_OK)

class UserCreateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request):
        data = request.data

        serializer = AdminUserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status = status.HTTP_201_CREATED)

class UserDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)


class UserUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.email = request.data['email']
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)