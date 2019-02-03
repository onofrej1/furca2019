from rest_framework import serializers
from django.contrib.auth.models import User
from blog import models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'text',
            'author'
        )
        model = models.Post



class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email')