import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
      },
    });
  }
}

export default new UserController();
