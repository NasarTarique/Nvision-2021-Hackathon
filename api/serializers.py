from rest_framework import serializers
from .models import Rooms , Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id','username')

class RoomSerializer(serializers.ModelSerializer):
    user  = UserSerializer(source='get_users', many=True)
    class Meta:
        model = Rooms
        fields = ('roomid', 'token', 'roomname', 'todos' , 'user')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ('roomname', 'todos')


class JoinRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username' , '')
