from django.db import models

# Create your models here.

class Note(models.Model):
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='notes',
        on_delete=models.CASCADE
    )
    exercise= models.ForeignKey(
        'exercises.Exercise',
        related_name='notes',
        on_delete=models.CASCADE
    )
    weight= models.CharField(max_length=10, default=None, blank=True, null=True)
    distance= models.CharField(max_length=10, default=None, blank=True, null=True)
    reps= models.PositiveIntegerField(default=None)
    date= models.DateField(auto_now_add=True)
    month = models.CharField(max_length=10, default=None, blank=True, null=True)
    description= models.TextField(max_length=300, default=None, blank=True, null=True) 