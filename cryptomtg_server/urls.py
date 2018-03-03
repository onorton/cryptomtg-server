"""cryptomtg_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
<<<<<<< HEAD
from django.conf.urls import include
from django.urls import path
from django.contrib import admin

urlpatterns = [
    path('cards/', include('cards.urls')),
    path('auctions/', include('auctions.urls')),
    path('trades/', include('trades.urls')),
=======
from django.contrib import admin
from django.urls import path

urlpatterns = [
>>>>>>> 292dd156a5ec0897fb309857d707d1760d319a17
    path('admin/', admin.site.urls),
]
