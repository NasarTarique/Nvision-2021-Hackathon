from rest_framework import serializers
from .models import Rooms , Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id','username', 'room')

class RoomSerializer(serializers.ModelSerializer):
    user  = UserSerializer(source='get_users', many=True)
    class Meta:
        model = Rooms
        fields = ('roomid', 'token', 'roomname', 'todos' , 'user')


class CreateRoomSerializer(serializers.Serializer):
    roomname = serializers.CharField(max_length=20)
    todos = serializers.CharField(max_length=1000, allow_blank=True)
    username = serializers.CharField(max_length=50)

