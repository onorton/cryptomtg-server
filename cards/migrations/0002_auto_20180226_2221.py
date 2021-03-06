# Generated by Django 2.0.2 on 2018-02-26 22:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('cardId', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='card',
            name='name',
        ),
        migrations.AddField(
            model_name='card',
            name='template',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='cards.CardTemplate'),
        ),
    ]
