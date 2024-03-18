import { Elysia } from 'elysia';

import * as authController from '../controllers/auth';
import authPlugin from '../plugins/authenticate';
import userRoutes from '../routes/user';

export default (app: Elysia) => app.use(authPlugin).use(userRoutes).post('/logout', authController.logout);
