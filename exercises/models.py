from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100, default=None)
    grouping = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=300, blank=True, null=True)
    video_url = models.CharField(max_length=300, blank=True, null=True)
    ownder = models.ForeignKey(
      'jwt_auth.User',
      related_name='exercises',
      on_delete= models.CASCADE
    )