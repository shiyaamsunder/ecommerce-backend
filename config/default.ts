import dotenv from 'dotenv';
dotenv.config();
export default {
  port: process.env.PORT || 8080,
  host: process.env.HOST,
  dbUri: process.env.DB_URI,
  saltworkfactor: parseInt(process.env.SALT_WORK_FACTOR!),
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  privateKey: process.env.PRIVATE_KEY
};
