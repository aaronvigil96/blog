import {Router} from 'express';
import appController from '../../controllers/appController.js';

const router = Router();

router.get('/', appController.getHome);

export default router;