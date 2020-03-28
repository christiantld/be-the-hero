import connection from '../../database/connection';
import * as Yup from 'yup';

class OngIncidentController {
  async index(req, res) {
    const ong_id = req.userId;
    console.log(ong_id);
    const { page = 1 } = req.query;

    const [count] = await connection('incidents')
      .count()
      .where('ong_id', ong_id);

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'ongs.id')
      .where('ong_id', ong_id)
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

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { title, description, value } = req.body;
    const ong_id = req.userId;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  }

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.userId;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new OngIncidentController();
