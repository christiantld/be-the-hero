import connection from '../../database/connection';
import * as Yup from 'yup';

class ProfileController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { id } = req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
      res.status(404).json({ error: 'User not found' });
    }

    return res.json(ong);
  }
}

export default new ProfileController();
