# Generated by Django 2.0.2 on 2018-02-26 23:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='auction',
            name='auctionEnd',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
