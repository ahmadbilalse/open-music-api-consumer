const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist({ playlistId, credentialId }) {
    const query = {
      text: `SELECT s.*
              FROM songs as s
              INNER JOIN
              playlistsongs as ps
              ON s.id = ps.song_id
              INNER JOIN playlists as p
              ON ps.playlist_id = p.id
              LEFT JOIN collaborations as c
              ON p.id = c.playlist_id
              WHERE (p.owner = $1 OR c.user_id = $1)
              AND p.id = $2
              `,
      values: [credentialId, playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
