from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index),
    path('join/', views.index),
    path('video/', views.index),
    path('create/', views.index),
    path('room/', views.index)
]
