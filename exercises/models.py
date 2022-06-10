from typing_extensions import Required
from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100, default=None,)
    grouping = models.CharField(max_length=100, default=None,)
    description = models.TextField(max_length=300, default=None, blank=True, null=True)
    video_url = models.CharField(max_length=300, default=None, blank=True, null=True)
    owner = models.ForeignKey(
      'jwt_auth.User',
      related_name='exercises',
      on_delete= models.CASCADE
    )

    def __str__(self):
        return f'{self.name} - {self.grouping}'