from django.contrib import admin
from VBIMusicApp.models import Song, Singer, SongSingerMapping, Playlist, SongPlayListMapping, User

# Register your models here.

admin.site.register(Song)
admin.site.register(Singer)
admin.site.register(SongSingerMapping)
admin.site.register(Playlist)
admin.site.register(SongPlayListMapping)
admin.site.register(User)


