// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId,
  data
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

app.use((req, res, next) => {
  console.log('Body:', req.body);
  next();
});

//Get a specific song's details based on songId
app.get('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId
    console.log(songId)
    const song = getSongBySongId(songId);
    res.status(200).json(song)
  } catch (e) {
    console.error('Error getting songId:', e)
  }
})
// Edit a specified song by songId ***PUT****
app.put('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId;
    const editedSong = editSongBySongId(songId, req.body);
    res.status(200).json(editedSong);
  } catch (e) {
    console.error('Error updating song:', e);
  }
})

// Edit a specified song by songId ***PATCH***
app.patch('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId;
    const editedSong = editSongBySongId(songId, req.body);
    res.status(200).json(editedSong);
  } catch (e) {
    console.error('Error updating song:', e);
  }
})
// Delete a specified song by songId
app.delete('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId;
    const deletedSong = deleteSongBySongId(songId);
    res.status(200).send({message: "Successfully deleted"});
  } catch (e) {
    console.error('Error deleting song:', e)
  }
})

app.get('/artists/latest/albums', (req, res) => {
  try{
    const latestArtistAlbum = getAlbumsForLatestArtist()
    res.status(200).json(latestArtistAlbum);
  } catch(e) {
    console.error('latest artist albums error:', e);
  }
})

app.get('/artists/latest', (req, res) => {
  try {
    const latestArtists = getLatestArtist();
    res.status(200).json(latestArtists)
  } catch(e){
    console.error('Artist latest error:', e);
  }
})


//Get all songs of a specific artist based on artistId
app.get('/artists/:artistId/songs', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const songs = getSongsByArtistId(artistId);
    res.status(200).json(songs);
  } catch (e) {
    console.error('Error getting songs by artist Id:', e);
  }
})
// Add an album to a specific artist based on artistId
app.post('/artists/:artistId/albums', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const newAlbum = addAlbumByArtistId(artistId, req.body);
    res.status(201).json(newAlbum);
  } catch (e) {
    console.error('Error adding album:', e);
  }
})

app.get('/artists/:artistId/albums', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const albums = getAlbumsByArtistId(artistId)
    res.status(200).json(albums)
  } catch (e) {
    console.error('Error getting artist albums', e);
  }
})

app.get('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId;
    console.log(artistId);
    res.status(200).json(getArtistByArtistId(artistId));
  } catch (error) {
    console.error('Error getting artist by id:', error)
  }
})

app.put('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const editedArtist = editArtistByArtistId(artistId, req.body)
    res.status(200).json(editedArtist);
    console.log('sucessfully updated')
  } catch (e) {
    console.error('Error putting artistId:', e)
  }
})

app.patch('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const editedArtist = editArtistByArtistId(artistId, req.body)
    res.status(200).json(editedArtist);
    console.log('sucessfully updated')
  } catch (e) {
    console.error('Error putting artistId:', e)
  }
})

app.delete('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId;
    deleteArtistByArtistId(artistId);
    res.status(200).send({message: "Successfully deleted"});
  } catch (e) {
    console.error('Error deleting artist:', e)
  }
})


app.get('/artists', (req, res) => {
  try {
    const artists = getAllArtists();
    res.status(200).json(artists)
  } catch (e) {
    console.error('Error getting all artists:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/artists', (req, res) => {
  try{
    console.log("testing post artist:", req.body)
    const newArtist = addArtist(req.body);
    res.status(201).json(newArtist)
  }
  catch(e) {
    console.error('Error posting new Artist:', e)
  }
})
//Get all songs of a specific album based on albumId
app.get('/albums/:albumId/songs', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const songs = getSongsByAlbumId(albumId);
    res.status(200).json(songs)
  } catch (e) {
    console.error('Error getting song by album id:', e);
  }
})
//Add a song to a specific album based on albumId
app.post('/albums/:albumId/songs', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const newSong = addSongByAlbumId(albumId, req.body);
    res.status(201).json(newSong)
  } catch (e) {
    console.error('Error creating song:', e);
  }
})
// get a specific album's details based on albumId
app.get('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const album = getAlbumByAlbumId(albumId);
    res.status(200).json(album);
  } catch (e) {
    console.error('Error geting albums by id:', e);
  }
})
//Edit a specified album by albumId ***PUT***
app.put('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const editedAlbum =  editAlbumByAlbumId(albumId, req.body);
    res.status(200).json(editedAlbum)
  } catch (e) {
    console.error('Error editing album:', e);
  }
})
//Edit a specified album by albumId ***PATCH***
app.patch('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const editedAlbum =  editAlbumByAlbumId(albumId, req.body);
    res.status(200).json(editedAlbum)
  } catch (e) {
    console.error('Error editing album:', e);
  }
})
// Delete a specified album by albumId
app.delete('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId;
    const deletedAlbum = deleteAlbumByAlbumId(albumId);
    res.status(200).send({message: "Successfully deleted"})
  } catch (e) {
    console.error('Error deleting album:', e);
  }
})

//Get all albums with names filtered by first letter
app.get('/albums', (req, res) => {
  try {
    const inputSearch = req.query.startsWith;
    const albumsFiltered = getFilteredAlbums(inputSearch);
    res.status(200).json(albumsFiltered)
  } catch (e) {
    console.error('Error getting albums starting with:', e)
  }
})
// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
