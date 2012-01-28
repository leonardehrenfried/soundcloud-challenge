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
  refreshPlaylistList : function(callback){
    var that = this;
    SC.get("/me/playlists",{}, function(resp, err){
      if(err){
        that.showNotification("Could not fetch playlists: " + err.message);
      }
      else{
        that.playlists = resp;
        that.renderPlaylists(that.playlists);
        if(callback){
          callback();
        }
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
    var editButton = this.getEditButton(playlist);
    var h3 = $("<h3>").text(playlist.title)
                .append(this.getEditButton(playlist))
                .append(this.getDeleteButton(playlist))
                ;
    playlistContainer.append(h3);

    if(playlist.tracks.length < 0){

    }
    else{
      playlistContainer.append($("<div>")
                               .text("This playlist doesn't contain any tracks yet."))
    }

    var h4 = $("<h5>").text("Add tracks to this playlist");
    var input = this.getSearchInput(playlist);
    playlistContainer
      .append(h4)
      .append(input);

    this.attachAutocomplete(input, playlist);
  },

  /**
   * Creates an autocompleting search input that allows the user to add songs 
   * to the a playlist.
   */
  getSearchInput : function(playlist){
    var input = $("<input>").addClass("xlarge")
                  .attr("size", "30").attr("type","text");
    return input;
  },

  /*
   * This autocomplete plugin insists on the DOM node being already inserted
   * into the DOM when it is being called. This is why this is a separate
   * function.
   */
  attachAutocomplete : function (input, playlist){
    var url = "http://api.soundcloud.com/tracks.json";
    input.marcoPolo({
        url: url,
        data: {
          client_id : SC.options.client_id
        },
        formatItem: function (data, $item) {
          window.console.log(data.title);
          return data.title;
        },
        onSelect: function (data, $item) {
          window.location = data.profile_url;
        }
      });
  },
  
  /**
   * Creates a delete button for a playlist.
   */
  getDeleteButton : function(playlist){
    var that = this;
    return $("<button>").addClass("btn danger").text("Delete")
      .click(function(){
        SC.delete("/me/playlists/" + playlist.id, function(response, error){
          if(error){
            that.showNotification("Could not delete playlist: " + error.message);
          }
          else{
            that.showNotification("Playlist '" + playlist.title + "' has been deleted.");
            
            // because of api caching I have to remove the playlist client-side, too, how annoying
            var newPlaylists = [];
            $.each(that.playlists, function(i, oldPlaylist){
              if(oldPlaylist.id !== playlist.id){
                newPlaylists.push(oldPlaylist);
              }
            });
            that.playlists = newPlaylists;
            that.renderPlaylists(that.playlists);
            that.showPlaylist(that.playlists[0]);
          }
        });
      });
  },

  /**
   * Creates a button to edit the title of a playlist.
   */
  getEditButton : function(playlist){
    var that = this;
    return $("<button>").addClass("btn").text("Edit title")
      .click(function(){
        var newTitle = prompt("Enter new title:");
        if(newTitle){
          playlist.title = newTitle;
          that.savePlaylistTitle(playlist); 
          that.showPlaylist(playlist);
          that.renderPlaylists(that.playlists);
        }
      });
  },

  /**
   * Persist the name change of a playlist.
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
                that.showNotification("Saving your playlist failed: "+error.message);
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

