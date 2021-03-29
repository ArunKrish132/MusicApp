from django.db import models
import uuid
import datetime

class Singer(models.Model):      
	id = models.AutoField(primary_key=True)
	singer_name = models.CharField(max_length=50, unique=True)

	def __str__(self):
		return self.singer_name

class Song(models.Model):
	id = models.AutoField(primary_key=True)
	song_title = models.CharField(max_length=50, db_index=True)
	album =  models.CharField(max_length=50, db_index=True)
	singers = models.ManyToManyField(
        Singer,
        through='SongSingerMapping'
    )
	play_time = models.CharField(max_length=50)
	updated_by = models.ForeignKey('User', on_delete=models.PROTECT)
	updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
	active = models.BooleanField(default=True)

	def __str__(self):
		return str(self.id)

class SongSingerMapping(models.Model):
	class Meta:
		unique_together = (('song_id', 'singer_id'),)

	id = models.AutoField(primary_key=True)
	song_id = models.ForeignKey('Song', on_delete=models.CASCADE, related_name='songs')
	singer_id = models.ForeignKey('Singer', on_delete=models.CASCADE, related_name='singers')

	def __str__(self):
		return str(self.id)

class Playlist(models.Model):
	id = models.AutoField(primary_key=True)
	uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	playlist_name = models.CharField(max_length=25, unique=True)
	songs = models.ManyToManyField(
        Song,
        through='SongPlayListMapping'
    )
	user_id = models.ForeignKey('User', on_delete=models.PROTECT)
	created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
	updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

	def __str__(self):
		return str(self.id)

class SongPlayListMapping(models.Model):
	class Meta:
		unique_together = (('playlist_id', 'song_id'),)

	id = models.AutoField(primary_key=True)
	playlist_id = models.ForeignKey('Playlist', on_delete=models.CASCADE)
	song_id = models.ForeignKey('Song', on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True, auto_now=False)

	def __str__(self):
		return str(self.id)

class User(models.Model):
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=10, unique=True)
	password = models.CharField(max_length=50)
	usergroup = models.CharField(max_length=20)
	updated_by = models.ForeignKey('User', on_delete=models.PROTECT, null=True, blank=True)
	updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
	active = models.BooleanField(default=True)

	def __str__(self):
		return '%s %s' % (self.id, self.username)
