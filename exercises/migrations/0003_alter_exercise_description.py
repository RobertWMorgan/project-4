# Generated by Django 4.0.5 on 2022-06-09 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0002_alter_exercise_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='description',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
    ]