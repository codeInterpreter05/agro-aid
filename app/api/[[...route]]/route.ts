import { Hono } from 'hono';
import { cors } from 'hono/cors'; // Import the Hono CORS middleware
import { handle } from 'hono/vercel';
import { HTTPException } from 'hono/http-exception';

import crops from './crops';
import cattle from './cattle';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

// Add CORS middleware
app.use(
  '*', // Apply to all routes
  cors({
    origin: 'https://agro-aid-sage.vercel.app', // Frontend domain
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// Define routes
app.route('/crops', crops).route('/cattle', cattle);

// Export handlers for Vercel
export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
