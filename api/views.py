from django.shortcuts import render
from .serializers import  CreateRoomSerializer , RoomSerializer, UserSerializer 
from .models import Rooms , Users
from rest_framework.views import APIView
from rest_framework import generics , status
from rest_framework.response import Response
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from .config import TWILIO_ACCOUNT_SID ,TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET

twilio_account_sid =TWILIO_ACCOUNT_SID
twilio_api_key_sid = TWILIO_API_KEY_SID
twilio_api_key_secret = TWILIO_API_KEY_SECRET

def generate_token(username, roomname):
    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room=roomname))
    return token.to_jwt().decode()


class RoomView(generics.ListAPIView):
    queryset = Rooms.objects.all() 
    serializer_class = RoomSerializer

class UserView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class RoomCreate(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        if not request.session.exists(request.session.session_key):
            request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            roomname = serializer.data.get('roomname')
            host =  request.session.session_key
            todos = serializer.data.get('todos')
            token = generate_token(roomname, roomname)
            username = serializer.data.get('username')
            room = Rooms(todos=todos, token=token, roomname=roomname ,host=host)
            room.save()
            user = Users(username=username, skey=host, room=room)
            user.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


