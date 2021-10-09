const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists({ credentialId }) {
    const query = {
      text: `SELECT p.id, p.name, u.username 
              FROM playlists AS p
              LEFT JOIN collaborations AS c
              on p.id = c.playlist_id
              INNER JOIN users AS u
              ON (p.owner = u.id OR c.playlist_id = u.id)
              WHERE p.owner = $1 
              OR c.user_id = $1`,
      values: [credentialId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
