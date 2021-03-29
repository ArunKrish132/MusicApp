var total_song_count = 0;

function openPlaylistDialog(){
    $("#playlist-name").val('');
    Metro.dialog.open('#playlistDialog');
}

function list_all_songs(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/list_all_songs/",
        data:{
        },
        success: function(data) 
        {
            total_song_count = data.length;
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span  class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#items-list").html(listItemHtml);
            }
            else{
                console.log('No result found!');
            }
        }
     })
}

function search_song(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/search_song/",
        data:{
            'search_text' : $('#_allsongs #search_text').val()
        },
        success: function(data) 
        {
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#items-list").html(listItemHtml);
            }
            else{
                console.log('No result found!');
            }
        }
     })
}

function list_all_playlists(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/list_all_playlists/",
        data:{
            'user_id': '1'
        },
        success: function(data) 
        {
            if (data.length != 0){
                let playlistItem ='';
                for(i = 0; i < data.length; i++){
                    playlistItem += '<div class="item playlist-item">';
                    playlistItem += '<span class="label" id="' + data[i].playlist_id + '" style="cursor:pointer;" value="' + data[i].playlist_name + '">' + data[i].playlist_name + '</span>';
                    playlistItem += '<span class="second-action" style="right: 20px;font-size: 10pt;width:130px;">' + data[i].created_at +'</span></div>';
                } 
                $( document ).ready(function() {
                    $(".playlist-item > .label").click(function(evt){
                        $("#playlist-header").html('<h6 class=".h6" id="playlist-header-value" value="' + $(this).attr("id") + '"">' + $(this).attr("value") + '</h6>');
                        view_playlist($(this).attr("id"));
                    });
                });
                $("#playlist-items").html(playlistItem);
                $(".playlist-items").css("display","block");
                $(".playlist-header").css("display","none");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-playlists").css("display","none");
                $(".no-songs").css("display","none");
            }
            else{
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","none");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-playlists").css("display","block");
                $(".no-songs").css("display","none");
            }
        }
     })
}

function create_playlist(){
    // alert('hi')
    $.ajax(
    {
        type:"POST",
        url: "/VBIMusicApp/create_playlist/",
        data:{
            'user_id': '1',
            'playlist_name': $('#playlist-name').val()
        },
        beforeSend: function(x) {
            if (x && x.overrideMimeType) {
              x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        beforeSend: function(xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
        success: function(data) 
        {
            // console.log('playlist created');
            let playlistItem ='';
            for(i = 0; i < data.length; i++){
                playlistItem += '<div class="item playlist-item">';
                playlistItem += '<span class="label" id="' + data[i].playlist_id + '" style="cursor:pointer;" value="' + data[i].playlist_name + '">' + data[i].playlist_name + '</span>';
                playlistItem += '<span class="second-action" style="right: 20px;font-size: 10pt;width:130px;">' + data[i].created_at +'</span></div>';
            } 
            $( document ).ready(function() {
                $(".playlist-item > .label").click(function(evt){
                    $("#playlist-header").html('<h6 class=".h6" id="playlist-header-value" value="' + $(this).attr("id") + '"">' + $(this).attr("value") + '</h6>');
                    view_playlist($(this).attr("id"));
                });
            });
            $("#playlist-items").html(playlistItem);
        }
     })
}

function view_playlist(playlist){
    // alert(playlist)
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/view_playlist/",
        data:{
            'playlist_id' : playlist
        },
        success: function(data) 
        {
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#playlist-songs").html(listItemHtml);
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","block");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","block");
                $(".shuffle-btn").css("display","initial");
                $(".no-songs").css("display","none");
                if (data.length == total_song_count){
                    $(".add-btn").css("display","none");
                }
                else{
                    $(".add-btn").css("display","initial");
                }
            }
            else{
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","none");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","initial");
                $(".no-songs").css("display","block");
            }
        }
     })
}

function list_songs_to_add_to_playlist(){
    // alert($('#playlist-header-value').attr("value"));
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/list_songs_to_add_to_playlist/",
        data:{
            'playlist_id' : $('#playlist-header-value').attr("value")
        },
        success: function(data) 
        {
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span class="second-action" style="right: 180px;font-size: 12pt;"><button class="button info mini" onclick="add_song_to_playlist(' + data[i].song_id + ')">Add Song</button></span>';
                    listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#playlist-songs").html(listItemHtml);
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","block");
                $(".playlist-search").css("display","block");
                $(".playlist-songs").css("display","block");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
            }
            else{
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","none");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-songs").css("display","block");
            }
        }
     })
}

function add_song_to_playlist(song_id){
    // alert($('#playlist-header-value').attr("value"))
    // alert(song_id);
    $.ajax(
    {
        type:"POST",
        url: "/VBIMusicApp/add_song_to_playlist/",
        data:{
            'playlist_id': $('#playlist-header-value').attr("value"),
            'song_id': song_id
        },
        beforeSend: function(x) {
            if (x && x.overrideMimeType) {
              x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        beforeSend: function(xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
        success: function(data) 
        {
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#playlist-songs").html(listItemHtml);
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","block");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","block");
                $(".shuffle-btn").css("display","initial");
                $(".no-songs").css("display","none");
                if (total_song_count == data.length){
                    $(".add-btn").css("display","none");
                }
                else{
                    $(".add-btn").css("display","initial");
                }
            }
            else{
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","block");
                $(".playlist-search").css("display","none");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-songs").css("display","block");
            }
        }
     })
}

function search_in_playlist(){
    // alert($('#playlist-header-value').attr("value"));
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/search_in_playlist/",
        data:{
            'playlist_id' : $('#playlist-header-value').attr("value"),
            'search_text' : $('#_playlists #search_text').val()
        },
        success: function(data) 
        {
            if (data.length != 0){
                let listItemHtml ='';
                for(i = 0; i < data.length; i++){
                    listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                    listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                    listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                    listItemHtml += '<span class="second-action" style="right: 180px;font-size: 12pt;"><button class="button info mini" onclick="add_song_to_playlist(' + data[i].song_id + ')">Add Song</button></span>';
                    listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
                } 
                $("#playlist-songs").html(listItemHtml);
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","block");
                $(".playlist-search").css("display","block");
                $(".playlist-songs").css("display","block");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-songs").css("display","none");
            }
            else{
                $(".playlist-items").css("display","none");
                $(".playlist-header").css("display","none");
                $(".playlist-search").css("display","block");
                $(".playlist-songs").css("display","none");
                $(".shuffle-btn").css("display","none");
                $(".add-btn").css("display","none");
                $(".no-songs").css("display","block");
            }
        }
     })
}

function shuffle_songs(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/shuffle_songs/",
        data:{
            'playlist_id' : $('#playlist-header-value').attr("value")
        },
        success: function(data) 
        {
            let listItemHtml ='';
            for(i = 0; i < data.length; i++){
                listItemHtml += '<div class="item"><img class="avatar" src="../../static/images/1.jpg">';
                listItemHtml += '<span class="label">' + data[i].song_title + '</span>';
                listItemHtml += '<span class="second-label">' + data[i].album + '</span>';
                listItemHtml += '<span class="second-label">' + data[i].singers + '</span>';
                listItemHtml += '<span class="second-action" style="right: 180px;font-size: 12pt;"><button class="button info mini playlist-search" onclick="add_song_to_playlist(' + data[i].song_id + ')">Add Song</button></span>';
                listItemHtml += '<span class="second-action" style="right: 96px;font-size: 12pt;cursor:none">' + data[i].play_time + '</span><span class="second-action mif-play fg-ash"></span></div>';
            } 
            $("#playlist-songs").html(listItemHtml);
            $(".playlist-items").css("display","none");
            $(".playlist-header").css("display","block");
            $(".playlist-search").css("display","none");
            $(".playlist-songs").css("display","block");
        }
     })
}