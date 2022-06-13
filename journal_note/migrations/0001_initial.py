# Generated by Django 4.0.5 on 2022-06-10 09:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('exercises', '0008_alter_exercise_description_alter_exercise_video_url'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.CharField(blank=True, default=None, max_length=10, null=True)),
                ('distance', models.CharField(blank=True, default=None, max_length=10, null=True)),
                ('reps', models.PositiveIntegerField(default=None)),
                ('date', models.DateField(auto_now_add=True)),
                ('description', models.TextField(blank=True, default=None, max_length=300, null=True)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='exercises.exercise')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]