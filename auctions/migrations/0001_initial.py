# Generated by Django 2.0.2 on 2018-02-26 23:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cards', '0002_auto_20180226_2221'),
    ]

    operations = [
        migrations.CreateModel(
            name='Auction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('highestBidder', models.CharField(max_length=255)),
                ('highestBid', models.IntegerField(default=0)),
                ('bidItem', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='cards.Card')),
            ],
        ),
    ]
