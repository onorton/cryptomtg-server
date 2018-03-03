from django.urls import path

from . import views

urlpatterns = [
    path('<slug:address>/', views.index, name='index'),
    path('add/<slug:address>', views.add),
    path('remove/<slug:address>', views.remove)

]
