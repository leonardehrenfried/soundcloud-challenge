#Hi Soundcloud!

This is my go at your coding challenge. I think I fulfilled most of the non-bonus
requirements and I hope you like it.

A few words about limitations: I'm using the Soundcloud OAuth API for fetching
playlists from a user and it seems that it has some severe caching in place.
It basically takes 5-10 minutes for a newly created playlist as well as the 
name change of to show up in the list of playlists.

I would have preferred not to have a local cache of playlists but since the
mentioned API limitations would have caused a poor experience, I went with
a mixture of local caching and remote storage. This means, if you refresh the
page after having just created a playlist, it may not show up for a few minutes.

For the live of me, I couldn't manage to make the API accept my modified 
```playlist.tracks``` array. Hence the tracks are not persisted and vanish
once you reload the page.

My time ran out when I was trying to implement the remote storage for the tags.
My strategy is that I take the tags from ```track.tags_list``` as well as the
user-entered tags, which I stored in HTML5 ```localStorage```.

##Browser support
I have tested it in the latest Versions of Chrome, Firefox and Safari. I don't
have a Windows computer so haven't tested it with IE. On my iPhone the app
itself works apart from the playing of the tracks. As you state in your docs,
streaming of songs isn't supported on mobile devices.
