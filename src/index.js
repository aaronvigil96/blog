import express, { urlencoded } from 'express';
import morgan from 'morgan';
import authRoute from './v1/routes/authRoute.js';
import appRoute from './v1/routes/appRoute.js';
import { PORT } from './config/handleEnv.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', './src/public/views');

app.use(express.static('./src/public'));
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({extended: true}));

app.use('/api/v1', authRoute);
app.use('/api/v1', appRoute);

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));