# Generated by Django 5.1.7 on 2025-03-30 22:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_alter_token_created_alter_token_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 30, 16, 6, 59, 719277)),
        ),
        migrations.AlterField(
            model_name='token',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 30, 16, 7, 59, 719277)),
        ),
    ]
