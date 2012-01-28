UI={
  
  /**
   * Fetches playlists from the API and displays them on the left hand side
   * menu.
   */
  refreshPlaylistList : function(){
    var that = this;
    SC.get("/me/playlists",{}, function(resp, err){
      var playlists = $("#playlists");
      playlists.empty();
      $.each(resp, function(i, playlist){
        var li = $("<li>").text(playlist.title)
                  .click(function(){
                    that.showPlaylist(playlist); //I ♥ closures  
                  });
        playlists.append(li);
      });
    }) 
  },
  
  /**
   * Displays a playlist in the right hand panel.
   */
  showPlaylist : function(playlist){
    alert(playlist.title);
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

