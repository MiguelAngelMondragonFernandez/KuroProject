# Generated by Django 5.1.7 on 2025-04-03 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conversaciones', '0003_conversacion_alias_grupo'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversacion',
            name='url_photo',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
