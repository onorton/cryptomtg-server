from django.urls import path

from . import views

urlpatterns = [
    path('<slug:address>/', views.cardsForAddress),
    path('transfer/<int:id>', views.transfer)
]
