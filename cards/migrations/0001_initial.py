# Generated by Django 2.0.2 on 2018-02-26 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('owner', models.CharField(max_length=255)),
                ('id', models.IntegerField(default=-1, primary_key=True, serialize=False)),
            ],
        ),
    ]