# Generated by Django 3.2.5 on 2021-07-08 18:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_portion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portion',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.subject'),
        ),
    ]
