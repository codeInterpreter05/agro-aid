import z from "zod"
import { zValidator } from "@hono/zod-validator"
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { HTTPException } from "hono/http-exception"

import crops from './crops'
import cattle from './cattle'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app
    .route("/crops", crops)
    .route("/cattle", cattle)

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;