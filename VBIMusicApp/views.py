from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import json
import random
from VBIMusicApp.models import Song, Singer, SongSingerMapping, Playlist, SongPlayListMapping, User

# Create your views here.

def user_login(request):
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username = username, password = password)

		if user:
			if user.is_active:
				login(request,user)
				return HttpResponseRedirect('/VBIMusicApp/')

			else:
				return HttpResponse('Account is not active')

		else:
			print('Login failed!')
			print("Username : {} and password : {}", format(username, password))
			return HttpResponse("Invalid login details")

	else:
		return render(request,'VBIMusicApp/login.html',{})

@login_required
def user_logout(request):
	logout(request)
	return render(request, 'VBIMusicApp/login.html')

def index(request):
	return render(request, 'VBIMusicApp/index.html')

def song_template(queryset):
	songs = []
	for song in queryset:
		singers_str = ','.join(list(song.singers.all().values_list('singer_name', flat=True)))
		songs.append({'song_id':song.id, 'song_title':song.song_title, 'singers': singers_str, 'album' : song.album, 'play_time': song.play_time})
	return songs

@login_required
@api_view(['GET'])
def list_all_songs(request):
	song_queryset = Song.objects.all().prefetch_related('singers')
	all_songs = song_template(song_queryset)
	return Response(data = all_songs, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def search_song(request):
	search_text = request.GET['search_text']
	song_queryset = Song.objects.filter(song_title__icontains=search_text).prefetch_related('singers')
	suggestions = song_template(song_queryset)
	return Response(data = suggestions, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def list_all_playlists(request):
	user_id = request.GET['user_id']
	all_playlists = []
	playlist_queryset = Playlist.objects.filter(user_id__exact=user_id)
	for playlist in playlist_queryset:
		all_playlists.append({'playlist_id':playlist.uuid, 'playlist_name':playlist.playlist_name, 'created_at': playlist.created_at.strftime("%d-%m-%Y %H:%M:%S")})
	return Response(data = all_playlists, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def view_playlist(request):
	playlist_id = request.GET['playlist_id']
	songs_list = song_template(Playlist.objects.filter(uuid=playlist_id).prefetch_related('songs')[0].songs.all().order_by('-songplaylistmapping'))
	return Response(data = songs_list, status=status.HTTP_200_OK)

@login_required
@api_view(['POST'])
def create_playlist(request):
	playlist_name = request.POST.get('playlist_name')
	user_id = request.POST.get('user_id')
	all_playlists = []
	user = User.objects.only('id').get(id=user_id)
	playlist = Playlist.objects.create(playlist_name=playlist_name, user_id=user)
	playlist.save()
	playlist_queryset = Playlist.objects.filter(user_id__exact=user_id)
	for playlist in playlist_queryset:
		all_playlists.append({'playlist_id':playlist.uuid, 'playlist_name':playlist.playlist_name, 'created_at': playlist.created_at.strftime("%d-%m-%Y %H:%M:%S")})
	print(all_playlists)
	return Response(data = all_playlists, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def list_songs_to_add_to_playlist(request):
	playlist_id = request.GET['playlist_id']
	song_id_list = list(Playlist.objects.filter(uuid=playlist_id).prefetch_related('songs')[0].songs.values_list('id', flat=True))
	songs_list = song_template(Song.objects.exclude(pk__in=song_id_list))
	return Response(data = songs_list, status=status.HTTP_200_OK)

@login_required
@api_view(['POST'])
def add_song_to_playlist(request):
	playlist_id = request.POST.get('playlist_id')
	song_id = request.POST.get('song_id')
	playlist = Playlist.objects.only('id').get(uuid=playlist_id)
	song = Song.objects.only('id').get(id=song_id)
	song_mapper = SongPlayListMapping.objects.create(playlist_id=playlist, song_id=song)
	song_mapper.save()
	songs_list = song_template(Playlist.objects.filter(uuid=playlist_id).prefetch_related('songs')[0].songs.all().order_by('-songplaylistmapping'))
	return Response(data = songs_list, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def search_in_playlist(request):
	playlist_id = request.GET['playlist_id']
	search_text = request.GET['search_text']
	print(playlist_id, search_text);
	song_id_list = list(Playlist.objects.filter(uuid=playlist_id).prefetch_related('songs')[0].songs.values_list('id', flat=True))
	songs_list = []
	if (list(Song.objects.exclude(pk__in=song_id_list).filter(song_title__icontains=search_text))) != 0:
		songs_list = song_template(Song.objects.exclude(pk__in=song_id_list).filter(song_title__icontains=search_text))
	return Response(data = songs_list, status=status.HTTP_200_OK)

@login_required
@api_view(['GET'])
def shuffle_songs(request):
	playlist_id = request.GET['playlist_id']
	song_id_list = list(Playlist.objects.filter(uuid=playlist_id).prefetch_related('songs')[0].songs.values_list('id', flat=True))
	songs_list = song_template(Song.objects.filter(pk__in=song_id_list).order_by('?'))
	print(songs_list)
	return Response(data = songs_list, status=status.HTTP_200_OK)
