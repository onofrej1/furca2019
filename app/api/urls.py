from django.urls import path

from .views import PostViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', PostViewSet, base_name='posts')
router.register(r'users', UserViewSet, base_name='posts')