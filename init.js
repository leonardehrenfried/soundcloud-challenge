$(document).ready(function(){
    
  var startApp = function(){
    $("#login-box").remove();
    $("#playlists-box").removeClass("hidden");
    UI.refreshPlaylistList(function(){
      UI.showPlaylist(UI.playlists[0]);
    });
  };

  //initialise Soundcloud client library
  SC.initialize({
    client_id    : "fb4ca313af415c9ce6a0e18478d16224",
    redirect_uri : "http://lenni.info/soundcloud-challenge/callback.html"
  });

  if(SC.accessToken()){
    startApp();
  }
  else{
    $("#login").click(function(){
      SC.connect(function(){
        startApp();
      });
    });
  }

  $("#add-playlist").click(function(){
    UI.createPlaylist();  
  });
});
