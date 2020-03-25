import connection from '../../database/connection';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .where('ong_id', ong_id)
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }
}

export default new ProfileController();
