# Generated by Django 5.1.4 on 2025-03-17 06:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_remove_tokenrecovery_created_alter_token_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 17, 0, 42, 0, 323494)),
        ),
        migrations.AlterField(
            model_name='token',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2025, 3, 17, 0, 43, 0, 323494)),
        ),
    ]
