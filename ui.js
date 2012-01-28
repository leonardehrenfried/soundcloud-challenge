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
};

