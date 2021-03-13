from django.db import models
import random
import string

# Create your models here.

def generate_key():
    while True:
        key =  ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(6))
        if Rooms.objects.filter(roomid=key).count() == 0:
            break
    return key


class Rooms(models.Model):
    roomid = models.CharField(max_length=6, default=generate_key, unique=True) 
    token = models.CharField(max_length=1000 , unique=True)
    host = models.CharField(max_length=100)
    roomname = models.CharField(max_length=20)
    private = models.BooleanField(default=True)
    todos = models.TextField(max_length=1000,null=True,blank=True)
    
    def get_users(self):
        users =  Users.objects.filter(room=self)
        return users


class Users(models.Model):
    username = models.CharField(max_length=50)
    skey  = models.CharField(max_length=100, default="", blank=True)
    room  = models.ForeignKey(Rooms, null=True , on_delete=models.SET_NULL)
