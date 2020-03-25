import connection from '../../database/connection';

class ProfileController {
  async store(req, res) {
    const { id } = req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
      res.status(404).json({ error: 'User not found' });
    }

    return res.json(ong);
  }
}

export default new ProfileController();
