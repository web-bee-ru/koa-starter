import { DataTypes } from 'sequelize';
import sequelize from '../index';

export const Example = sequelize.define(
  'example',
  {
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  },
);

export function associate() {}
