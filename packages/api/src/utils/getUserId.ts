import { AuthenticationError } from 'apollo-server';
import { verify as jwtVerify } from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { Context } from '../types/graphql-utils';
import { Request } from 'express';

export interface JTWPayload {
  userId: string;
}
function getJWT(request: Request): JTWPayload | null {
  const authHeader = request.get('Authorization');
  // request.get is not returning undefined, it is returning "undefined" (as string)
  if (!authHeader || authHeader.length < 15) {
    return null;
  }
  const token = authHeader.replace('Bearer ', '');
  return jwtVerify(token, APP_SECRET) as JTWPayload;
}

export function jwtMiddleware(request: Request) {
  const jwt = getJWT(request);
  if (jwt) { return {...jwt} }
  return null;
}

export default function getUserId(ctx: Context) {
  const jwt = getJWT(ctx.req);
  if (jwt) {
    return jwt.userId;
  }

  throw new AuthenticationError('unauthorized');
}