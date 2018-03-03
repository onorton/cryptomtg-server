from django.db import models
from cards.models import Card

# Create your models here.
class Trade(models.Model):
    first_party = models.CharField(max_length=255)
    second_party = models.CharField(max_length=255)
    first_accepted = models.BooleanField(default=False)
    second_accepted = models.BooleanField(default=False)
    address = models.CharField(max_length=255)

class TradeItem(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, default=None)
    party = models.CharField(max_length=255)
    trade = models.ForeignKey(Trade, on_delete=models.CASCADE, default=None)
