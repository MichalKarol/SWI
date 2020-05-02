from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Star


class StarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Star
        fields = ['id', 'doc_id']
