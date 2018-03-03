from django.http import HttpResponse

from cards.models import Card
from cards.models import CardTemplate
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def cardsForAddress(request, address):
    if request.method == "GET":
        cards = Card.objects.filter(owner=address)
        cards = list(map(lambda card: "{\"name\": \"" + card.template.name + "\", \"cardId\":" + str(card.template.cardId) + ",\"address\": \"" + card.address + "\"}", cards))
        cards = '[' + ','.join(cards) + ']'
        return HttpResponse("{\"cards\": " + str(cards) +"}")
    elif request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        # Check if card has already been submitted
        if Card.objects.filter(id=body['id']).count() != 0:
            return HttpResponse("{message: There already exists a card with this id.}", status=403)
        card = Card(template=CardTemplate.objects.filter(name=body['name']).first(),owner=address, id=body['id'],address=body['address'])
        card.save()
        return HttpResponse("{\"name\": \"" +card.template.name + "\", \"cardId\": " + str(card.template.cardId)  + "}")

@csrf_exempt
def transfer(request, id):
    if request.method == "PUT":
        body = json.loads(request.body.decode("utf-8"))
        card = Card.objects.filter(id=id).first()
        card.owner = body['address']
        card.save()
        return HttpResponse("{\"message\":\"Card successfully transferred.\"}")
