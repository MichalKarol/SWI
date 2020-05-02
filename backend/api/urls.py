from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers, serializers, viewsets
from .views import StarViewSet, loginEndpoint, register

# from api.views


router = routers.DefaultRouter()
router.register(r"^api/stars", StarViewSet, basename="StarViewSet")

urlpatterns = [
    url(r"^", include(router.urls)),
    path('api/login', loginEndpoint),
    path('api/register', register)
]