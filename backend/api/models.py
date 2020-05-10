from django.db import models
from django.contrib.auth.models import User


class Star(models.Model):
    doc_id = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
