# Generated by Django 4.0.5 on 2022-06-09 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0007_alter_exercise_description_alter_exercise_grouping_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='description',
            field=models.TextField(blank=True, default=None, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='video_url',
            field=models.CharField(blank=True, default=None, max_length=300, null=True),
        ),
    ]
