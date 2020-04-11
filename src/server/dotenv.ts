import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV = null } = process.env;

export const isDevelopment: boolean = NODE_ENV === 'development';
