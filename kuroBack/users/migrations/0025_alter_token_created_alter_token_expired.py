# Generated by Django 5.1.7 on 2025-03-30 21:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0024_alter_token_created_alter_token_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 30, 15, 53, 31, 585921)),
        ),
        migrations.AlterField(
            model_name='token',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 30, 15, 54, 31, 585921)),
        ),
    ]
