# Generated by Django 5.1.4 on 2025-03-17 04:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_token_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 16, 22, 38, 48, 339560)),
        ),
        migrations.AlterField(
            model_name='token',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 17, 22, 38, 48, 339560)),
        ),
    ]
