# Generated by Django 4.0.5 on 2022-06-10 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal_note', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='month',
            field=models.CharField(default=None, max_length=10),
        ),
    ]
