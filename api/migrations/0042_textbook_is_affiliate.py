# Generated by Django 3.2.5 on 2021-08-06 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0041_alter_textbook_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='textbook',
            name='is_affiliate',
            field=models.BooleanField(default=False),
        ),
    ]
