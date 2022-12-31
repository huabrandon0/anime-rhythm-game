# *Your Name*: A Rhythm Game
## Introduction

This is a project made for a computer graphics class I took in college.
This project is a rhythm game, and it follows a classic four-lane design (e.g. Dance Dance Revolution) where the player must hit notes as they travel down the screen. The music and art is appropriated from the animated movie *Your Name* (2016).

[Video submission I used for class](https://youtu.be/rv-ArUMxR9Q)

## Implementation
In terms of implementation, the game is made using UCLA's Tiny Graphics library, which is a wrapper for WebGL. The assets comprise only 2D art. The objects in the game are all textured planes--there are no 3D objects. Depth-testing is disabled in order to get alpha blending among images working correctly (and therefore, extra care is taken in ordering the draw calls).

The "beatmaps" (i.e. the notes that the player must hit) are imported from osu! mania beatmaps ([osu! beatmap directory](https://osu.ppy.sh/beatmapsets)). Beatmaps are parsed using the information found in the [osu! knowledge base](https://osu.ppy.sh/wiki/sk/osu!_File_Formats/Osu_(file_format))--it ultimately boils down to series of key-value pairs mapping time (ms) to note position (lane number, in our case). To keep track of notes during gameplay, we convert their times (ms) to rhythmic units (beats). Based on the beat of the note along with the beat of the song's current timestamp, we can compute whether the note is "in play" and, if it is, its ideal position in the 3D scene. This beat-based method ensures music is synced with the notes. The player can hit a note within a certain tolerance of the beat.

Many of the special effects and animations are done using custom shaders. For example, the notes look like they are being carried along a conveyer belt of sorts; this is done through a scrolling texture shader.

## How to Run 
1. Download the repository
2. Install [Python](https://www.python.org/)
3. Run host.bat (for Windows) or host.command (for MacOS)
4. Open browser and go to [http://localhost:8000](http://localhost:8000/)

## References
* https://www.gamasutra.com/blogs/YuChao/20170316/293814/Music_Syncing_in_Rhythm_Games.php (Music syncing)

* https://github.com/ethanhjennings/webgl-fire-particles (Particle system)
