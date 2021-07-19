import mongoose from 'mongoose';
import config from 'config';
import log from '../lib/logger';

const connect = () => {
  const dbUri = config.get<string>('dbUri');
  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info(`Database connected 🚀`);
    })
    .catch((err) => {
      log.error(`DB Error 😢:`, err);
    });
};

export default connect;
