//initialise Soundcloud client library
SC.initialize({
  client_id    : "fb4ca313af415c9ce6a0e18478d16224",
  redirect_uri : "http://lenni.info/soundcloud-challenge/callback.html"
});

$(document).ready(function(){
  
  $("#login").click(function(){
    SC.connect(function(){
      $("#login-box").remove();
      $("#playlists-box").removeClass("hidden");
    });
  });

  $("#add-playlist").click(function(){
    alert("adding playlist");
    SC.post("/playlists.json", {
      playlist:{
        title   : "Horst",
        sharing : "public",
        tracks  : [{id:"1600572"},{id:"1600572"}]
      }
    },function(response, error){
      if(error){
        alert("an error occurred");
      }
      else{
        alert("playlist created");
      }
    });
  });

});
