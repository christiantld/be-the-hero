import connection from '../../database/connection';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

class ProfileController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required().length(8),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { id, password } = req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();
    const getPassword = await connection('ongs')
      .where('id', id)
      .select('password_hash')
      .first();

    const password_hash = String(Object.values(getPassword));

    if (!ong) {
      res.status(404).json({ error: 'User not found' });
    }

    function checkPassword(password) {
      return bcrypt.compare(password, password_hash);
    }

    if (!(await checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    return res.json({
      ong,
      token: jwt.sign(
        {
          id,
        },
        auth.secret,
        {
          expiresIn: auth.expiresIn,
        },
      ),
    });
  }
}

export default new ProfileController();
