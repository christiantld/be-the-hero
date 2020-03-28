import connection from '../../database/connection';

class IncidentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'ongs.id')
      .limit(6)
      .offset((page - 1) * 6)
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

export default new IncidentController();
