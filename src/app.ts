import express from 'express';
import config from 'config';
import log from './lib/logger';
import morgan from 'morgan';
import cors from 'cors';
import connect from './db/connect';
import routes from './routes';
import { deserializeUser } from './middleware';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(morgan('dev'));
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listening on http://${host}:${port} 🔥`);
  connect();
  routes(app);
});
