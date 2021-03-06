# Generated by Django 2.0.2 on 2018-03-03 00:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cards', '0003_card_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_party', models.CharField(max_length=255)),
                ('second_party', models.CharField(max_length=255)),
                ('first_accepted', models.BooleanField()),
                ('second_accepted', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='TradeItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('party', models.IntegerField(default=0)),
                ('card', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='cards.Card')),
                ('trade', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='trades.Trade')),
            ],
        ),
    ]
