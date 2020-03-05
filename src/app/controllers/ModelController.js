import * as Yup from 'yup';
import Models from '../models/Models';
import Brand from '../models/Brand';

class ModelController {
  async store(req, res) {
    const schema = Yup.object().shape({
      brand_id: Yup.number().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { brand_id, name } = req.body;

    const modelExists = await Models.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (modelExists) {
      return res.status(400).json({ error: 'Model already exists.' });
    }

    const model = await Models.create({ brand_id, name });

    return res.status(201).json(model);
  }

  async show(req, res) {
    const { id } = req.params;

    const model = await Models.findByPk(id);
    if (model == null) {
      return res.status(400).json({ error: 'Model not found.' });
    }
    return res.json(model);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      brand_id: Yup.number().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const model = await Models.findByPk(id);
    if (model == null) {
      return res.status(400).json({ error: 'Model not found.' });
    }

    model.update(req.body);

    return res.status(200).json(model);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const model = await Models.findByPk(id);
    if (!model) {
      return res.status(400).json({ error: 'Model not found.' });
    }

    model.destroy();

    return res.status(200).json({ message: 'Model deleted' });
  }

  async index(req, res) {
    const { brandId } = req.params;

    const model = await Models.findAll({
      where: {
        brand_id: brandId,
      },
      order: ['name'],
      attributes: ['name', 'id'],
    });

    return res.status(200).json(model);
  }
}

export default new ModelController();
