import connection from '../../database/connection';
import crypto from 'crypto';

class OngController {
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  }

  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }
}

export default new OngController();
