from django.db import models

class CardTemplate(models.Model):
    name = models.CharField(max_length=255)
    cardId = models.IntegerField(default=0)

class Card(models.Model):
    template = models.ForeignKey(CardTemplate, on_delete=models.CASCADE, default=None)
    owner = models.CharField(max_length=255)
    id = models.IntegerField(default=-1, primary_key=True)
    address = models.CharField(max_length=255)
