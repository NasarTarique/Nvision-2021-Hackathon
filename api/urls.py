from rest_framework import routers
from django.urls import path
from  .views import RoomView , RoomCreate


urlpatterns = [
    path('',RoomView.as_view()),
    path('create/', RoomCreate.as_view())

]

