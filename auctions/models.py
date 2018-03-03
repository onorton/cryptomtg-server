from django.db import models

from datetime import datetime
from cards.models import Card
from django.utils import timezone

class Auction(models.Model):
    bidItem = models.ForeignKey(Card, default=None, on_delete=models.CASCADE)
    highestBidder = models.CharField(max_length=255)
    highestBid = models.FloatField(default=0)
    address = models.CharField(max_length=255)
    auctionEnd = models.DateTimeField(default=timezone.now, blank=True)
