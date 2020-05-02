from django.db import models
from django.contrib.auth.models import User


class Star(models.Model):
    doc_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
