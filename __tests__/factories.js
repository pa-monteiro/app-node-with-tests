import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Brand from '../src/app/models/Brand';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Brand', Brand, {
  name: faker.company.companyName(),
});

export default factory;
