from django.shortcuts import render

from rest_framework import viewsets

from blog import models
from . import serializers

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer


