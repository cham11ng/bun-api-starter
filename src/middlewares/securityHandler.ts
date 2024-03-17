import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';

export default (app: Elysia) => app.use(cors());
