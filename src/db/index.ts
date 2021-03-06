import requireDir from 'require-dir';
import { Sequelize } from 'sequelize';
import configs from './db.config';

const DB_CONFIG = configs[process.env.NODE_ENV];

const sequelize = new Sequelize(DB_CONFIG);

export async function initDatabase() {
  await sequelize.authenticate();

  const modelsDir = requireDir('./models');
  Object.entries(modelsDir).forEach(([fileName, imported]) => {
    if (typeof imported.associate === 'function') {
      imported.associate();
    }
  });
}

export default sequelize;
