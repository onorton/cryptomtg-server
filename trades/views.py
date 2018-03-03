from django.http import HttpResponse
from django.db.models import Q

from trades.models import TradeItem
from trades.models import Trade

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cards.models import Card

import json

def tradeToJson(trade):
    first_party_items = TradeItem.objects.filter(party = trade.first_party, trade=trade)
    first_party_items = list(map(lambda item: "{\"name\": \"" + item.card.template.name + "\", \"cardId\":" + str(item.card.template.cardId) + ",\"address\": \"" + item.card.address + "\", \"id\":" + str(item.card.id) + "}", first_party_items))
    first_party_items = '[' + ','.join(first_party_items) + ']'

    second_party_items = TradeItem.objects.filter(party = trade.second_party, trade=trade)
    second_party_items = list(map(lambda item: "{\"name\": \"" + item.card.template.name + "\", \"cardId\":" + str(item.card.template.cardId) + ",\"address\": \"" + item.card.address + "\", \"id\":" + str(item.card.id) + "}", second_party_items))
    second_party_items = '[' + ','.join(second_party_items) + ']'

    trade = ("{\"first_party_items\": " + first_party_items
    + ", \"second_party_items\": " + second_party_items
    + ", \"first_party\": \"" + trade.first_party
    + "\", \"second_party\": \""+ trade.second_party
    + "\", \"address\": \"" + trade.address
    + "\"}")
    return trade



# Create your views here.
@csrf_exempt
def index(request, address):
    if request.method == 'GET':
        trades = Trade.objects.filter(Q(first_party=address) | Q(second_party=address))
        trades = list(map(lambda trade: tradeToJson(trade), trades))
        trades = '[' + ','.join(trades) + ']'
        return HttpResponse("{\"trades\": " + str(trades) +"}")
    elif request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        trade = Trade(first_party=address, second_party=body['secondParty'], address=body['address'])
        trade.save()
        card = Card.objects.filter(id = body['card']).first()
        tradeItem = TradeItem(card=card, party=address, trade=trade)
        tradeItem.save()
        return HttpResponse(tradeToJson(trade))
    elif request.method == 'DELETE':
        body = json.loads(request.body.decode("utf-8"))
        Trade.objects.filter(address=body['address']).delete()
        return HttpResponse("{ \"address\": \"" + body['address'] + "\"}")

@csrf_exempt
def add(request, address):
    if request.method == 'PUT':
        body = json.loads(request.body.decode("utf-8"))
        trade = Trade.objects.filter(address=address).first()
        card = Card.objects.filter(id = body['card']).first()
        tradeItem = TradeItem(card=card, party=body['party'], trade=trade)
        tradeItem.save()
        return HttpResponse()

@csrf_exempt
def remove(request, address):
    if request.method == 'PUT':
        body = json.loads(request.body.decode("utf-8"))
        trade = Trade.objects.filter(address=address).first()
        card = Card.objects.filter(id = body['card']).first()
        TradeItem.objects.filter(card=card,trade=trade).delete()
        return HttpResponse()
