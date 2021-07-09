import { Context } from '../app';
import * as s from './schema';

export const urlPrefix = '/users';
export const routes: any = {};

routes.create = { method: 'POST', url: '' };
export async function create(ctx: Context, params: s.CreateUser): Promise<s.UserResponse> {
  console.log('create user', params);
  return { id: 1, name: 'foo', email: 'bar' };
}

routes.update = { method: 'POST', url: '/:id' };
export async function update(ctx: Context, id: number, params: s.UpdateUser): Promise<s.UserResponse> {
  console.log('update user', id, params);
  return { id: 1, name: 'foo', email: 'bar' };
}

routes.list = { method: 'GET', url: '' };
export async function list(ctx: Context): Promise<s.UserResponse[]> {
  return [];
}
