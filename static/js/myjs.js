function search_song(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/search_song/",
        data:{
            'search_text' : $('#search_text').val()
        },
        success: function(data) 
        {
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
            // console.log('list_all_playlists', data);
            let playlistItem ='';
            for(i = 0; i < data.length; i++){
                playlistItem += '<div class="item">';
                playlistItem += '<span class="label" style="cursor:pointer;">' + data[i].playlist_name + '</span>';
                playlistItem += '<span class="second-action" style="right: 20px;font-size: 10pt;width:130px;">' + data[i].created_at +'</span></div>';
            } 
            $("#playlist-items").html(playlistItem);
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
                playlistItem += '<div class="item">';
                playlistItem += '<span class="label" style="cursor:pointer;">' + data[i].playlist_name + '</span>';
                playlistItem += '<span class="second-action" style="right: 20px;font-size: 10pt;width:130px;">' + data[i].created_at +'</span></div>';
            } 
            $("#playlist-items").html(playlistItem);
        }
     })
}

function search_song(){
    $.ajax(
    {
        type:"GET",
        url: "/VBIMusicApp/search_song/",
        data:{
            'search_text' : $('#search_text').val()
        },
        success: function(data) 
        {
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
     })
}