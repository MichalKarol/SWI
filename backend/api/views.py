import requests
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token
from .serializers import StarSerializer
from .models import Star
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.response import Response


class StarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = StarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Star.objects.filter(user=self.request.user).all()

    def create(self, request, *args, **kwargs):
        Star.objects.create(user=self.request.user, doc_id=request.data.get("doc_id"))
        return Response(status=204)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def loginEndpoint(request):
    username = request.data.get("username")
    password = request.data.get("password")
    return login(username, password)


def login(username, password):
    if username is None or password is None:
        return Response(
            {"error": "Please provide both username and password"},
            status=HTTP_400_BAD_REQUEST,
        )
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    if username is None or password is None:
        return Response(
            {"error": "Please provide  username, email, password"},
            status=HTTP_400_BAD_REQUEST,
        )
    try:
        User.objects.create_user(username, email, password)
        return login(username, password)
    except IntegrityError:
        return Response({'message': 'User with this username already exists'}, status=HTTP_400_BAD_REQUEST)


@permission_classes((permissions.IsAuthenticated,))
@api_view(["POST", "GET", "PUT", "PATCH"])
def search(request, proxy_path):
    """
    Search engine proxy
    """
    url = f'{settings.SEARCH_ENGINE_ENDPOINT}{proxy_path}'
    if 'QUERY_STRING' in request.META:
        url += '?' + request.META['QUERY_STRING']
    
    try:
        response = requests.get(url)
        r = HttpResponse(response.text, status=response.status_code, content_type='application/json')
        return r
    except Exception as e:
        return Response(
            {'message': f'Search engine error url={url} user={request.user.username} exception={e}'},
            status=HTTP_500_INTERNAL_SERVER_ERROR
        )
