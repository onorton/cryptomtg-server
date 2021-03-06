# Generated by Django 2.0.2 on 2018-03-03 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0002_auto_20180303_0037'),
    ]

    operations = [
        migrations.AddField(
            model_name='trade',
            name='address',
            field=models.CharField(default=None, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='trade',
            name='first_accepted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='trade',
            name='second_accepted',
            field=models.BooleanField(default=False),
        ),
    ]
