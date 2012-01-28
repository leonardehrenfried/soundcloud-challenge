UI={
  //list of playlists, I would have preferred not to store them locally 
  //and keep fetching them from the server on every update but it seems
  //that the data changes need a few minutes to propagate, hence the local
  //cache
  playlists : [],

  /**
   * Fetches playlists from the API and displays them on the left hand side
   * menu.
   */
  refreshPlaylistList : function(){
    var that = this;
    SC.get("/me/playlists",{}, function(resp, err){
      if(err){
        that.showNotification("Could not fetch playlists: " + err.message);
      }
      else{
        that.playlists = resp;
        that.renderPlaylists(that.playlists);
      }
    }) 
  },
  
  /**
   * Renders the list of playlists on the left hand side.
   */
  renderPlaylists : function(playlists){
    var that = this,
        playlistContainer = $("#playlists").empty();

    $.each(playlists, function(i, playlist){
      var li = $("<li>").text(playlist.title)
      .click(function(){
        that.showPlaylist(playlist); //I ♥ closures  
      });
      playlistContainer.append(li);
    }); 
  },

  /**
   * Displays a playlist in the right hand panel.
   */
  showPlaylist : function(playlist){
    var that = this;
    var playlistContainer = $("#playlist-detail").empty();
    var editButton = $("<button>").addClass("btn").text("Edit title")
    .click(function(){
      var newTitle = prompt("Enter new title:");
      if(newTitle){
        playlist.title = newTitle;
        that.savePlaylistTitle(playlist); 
        that.showPlaylist(playlist);
        that.renderPlaylists(that.playlists);
      }
    });
    var h3 = $("<h3>").text(playlist.title)
    .append(editButton);
    playlistContainer.append(h3);

    if(playlist.tracks.length < 0){

    }
    else{
      playlistContainer.append($("<div>")
                               .text("This playlist doesn't contain any tracks yet."))
    }
  },

  /**
   * Persist the name change of a playlist
*/
  savePlaylistTitle : function(playlist){
    SC.post("/me/playlists", 
            {
              playlist:{
                id:    playlist.id,
                title: playlist.title
              }
            }, 
            function(response, error){
              if(error){
                that.showNotification("Saving your playlist failed:"+error.message);
                console.log(error);
              }
            });
  },

  /**
   * Creates a new, empty playlist. The user needs change the name and 
   * fill it with tracks afterwards.
*/
  createPlaylist : function(){
    var that = this;
    SC.post("/playlists.json", {
      playlist:{
        title   : "New playlist",
        sharing : "public",
        tracks  : [{id:"1600572"},{id:"1600572"}]
      }
    },function(response, error){
      if(error){
        window.console.log(error);
        that.showNotification(error);
      }
      else{
        that.refreshPlaylistList();
        that.showNotification("Playlist '" + response.title + "' created.");
      }
    });
  },

/*
   * Displays a notfication to the user.
*/
  showNotification : function(text){
    var notifications = $("#notifications").removeClass("hidden");
    notifications.find("p").text(text);
    setTimeout(function(){
      notifications.addClass("hidden");
    }, 5000);
  }
};

