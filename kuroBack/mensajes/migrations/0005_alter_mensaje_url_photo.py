# Generated by Django 5.1.7 on 2025-04-03 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mensajes', '0004_remove_mensaje_url_image_mensaje_url_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mensaje',
            name='url_photo',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
