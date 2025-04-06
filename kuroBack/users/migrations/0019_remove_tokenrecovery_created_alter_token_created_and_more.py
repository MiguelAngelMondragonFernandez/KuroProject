# Generated by Django 5.1.4 on 2025-03-17 06:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_token_created_alter_token_expired_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tokenrecovery',
            name='created',
        ),
        migrations.AlterField(
            model_name='token',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 17, 0, 40, 17, 634067)),
        ),
        migrations.AlterField(
            model_name='token',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 17, 0, 41, 17, 634067)),
        ),
    ]
