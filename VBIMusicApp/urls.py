from django.conf.urls import url
from VBIMusicApp import views

app_name = 'VBIMusicApp'

urlpatterns = [
	url(r'^user_login/$',views.user_login, name='user_login'),
	url(r'^$', views.index, name='index'),
	url(r'^list_all_songs/$', views.list_all_songs, name='list_all_songs'),
	url(r'^search_song/$', views.search_song, name='search_song'),
	url(r'^list_all_playlists/$', views.list_all_playlists, name='list_all_playlists'),
	url(r'^view_playlist/$', views.view_playlist, name='view_playlist'),
	url(r'^create_playlist/$', views.create_playlist, name='create_playlist'),
	url(r'^list_songs_to_add_to_playlist/$', views.list_songs_to_add_to_playlist, name='list_songs_to_add_to_playlist'),
	url(r'^add_song_to_playlist/$', views.add_song_to_playlist, name='add_song_to_playlist'),
	url(r'^search_in_playlist/$', views.search_in_playlist, name='search_in_playlist'),
	url(r'^shuffle_songs/$', views.shuffle_songs, name='shuffle_songs'),
]