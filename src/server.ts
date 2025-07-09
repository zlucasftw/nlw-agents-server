import { fastify } from 'fastify';

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';

import { env } from './env.ts';
import { sql } from './db/connection.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastify, {
    origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'OK';
});

app.register(getRoomsRoute);

app.listen({ port: env.PORT });
