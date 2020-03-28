import connection from '../../database/connection';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

class OngController {
  async store(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().length(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { password, name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');
    const password_hash = await bcrypt.hash(password, 8);

    await connection('ongs').insert({
      id,
      password_hash,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  }

  // add update

  // add show

  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }
}

export default new OngController();
