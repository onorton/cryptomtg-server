# Generated by Django 2.0.2 on 2018-03-03 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_auction_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='highestBid',
            field=models.FloatField(default=0),
        ),
    ]
