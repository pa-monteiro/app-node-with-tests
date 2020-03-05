import * as Yup from 'yup';
import Brand from '../models/Brand';

class BrandController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const brandExists = await Brand.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (brandExists) {
      return res.status(400).json({ error: 'Brand already exists.' });
    }

    const brand = await Brand.create({ name });

    return res.status(201).json(brand);
  }

  async show(req, res) {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(400).json({ error: 'Brand not found.' });
    }
    return res.json(brand);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(400).json({ error: 'Brand not found.' });
    }

    brand.update(req.body);

    return res.status(200).json(brand);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(400).json({ error: 'Brand not found.' });
    }

    brand.destroy();

    return res.status(200).json({ message: 'Brand deleted' });
  }

  async index(req, res) {
    const brand = await Brand.findAll({
      order: ['name'],
    });

    return res.status(200).json(brand);
  }
}

export default new BrandController();
