//initialise Soundcloud client library
SC.initialize({
  client_id    : "fb4ca313af415c9ce6a0e18478d16224",
  redirect_uri : "http://lenni.info/soundcloud-challenge/callback.html"
});

$(document).ready(function(){
  $("#login").click(function(){


    SC.connect(function(){
      SC.put("/me/followings/3207", function(user, error){
        if(error){
          alert("Error: " + error.message);
        }else{
          alert("You are now following " + user.username);
        }
      });
    });
  });
});
