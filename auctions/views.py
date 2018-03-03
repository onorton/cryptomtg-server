from django.http import HttpResponse

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cards.models import Card
from auctions.models import Auction
import json

from datetime import datetime

# Create your views here.
@csrf_exempt
def index(request):
    if request.method == 'GET':
        liveAuctions = Auction.objects.filter(auctionEnd__gt=datetime.now())
        liveAuctions = list(map(lambda auction: "{\"name\": \"" + auction.bidItem.template.name
        + "\", \"cardId\": " + str(auction.bidItem.template.cardId)
        + ", \"highestBid\": " + str(auction.highestBid)
        + ", \"auctionEnd\": \"" + str(auction.auctionEnd)
        + "\", \"address\": \"" + str(auction.address)
        + "\"}", liveAuctions))
        liveAuctions = '[' + ','.join(liveAuctions) + ']'
        return HttpResponse("{\"auctions\": " + str(liveAuctions) +"}")
    elif request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        card = Card.objects.filter(id = body['id']).first()
        auction = Auction(bidItem=card, highestBidder=body['address'], highestBid=body['minimumBid'], auctionEnd=body['auctionEnd'], address=body['address'])
        auction.save()
        print("{\"name\": \"" + auction.bidItem.template.name
        + "\", \"cardId\": " + str(auction.bidItem.template.cardId)
        + ", \"auctionEnd\": " + str(auction.auctionEnd)
        + ", \"highestBid\": " + str(auction.highestBid)
        + ", \"address\": \"" + str(auction.address)
        + "\"}")
        return HttpResponse("{\"name\": \"" + auction.bidItem.template.name
        + "\", \"cardId\": " + str(auction.bidItem.template.cardId)
        + ", \"auctionEnd\": \"" + str(auction.auctionEnd)
        + "\", \"highestBid\": " + str(auction.highestBid)
        + ", \"address\": \"" + str(auction.address)
        + "\"}")

@csrf_exempt
def bid(request, address):
    body = json.loads(request.body.decode("utf-8"))
    auction = Auction.objects.filter(address=address).first()
    auction.highestBid = body['bid']
    auction.save()
    return HttpResponse()
