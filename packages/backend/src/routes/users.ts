import Router from '@koa/router'
import { Users } from '@boiling/core'
import { UsersService } from '../services/users'
import { Security } from '../utils'

export const router = new Router({
  prefix: '/users'
})
  .post('/', async ctx => {
    const { username, password } = ctx.request.body as Users.Register
    const user = await UsersService.add({ username, passwordHash: Security.encrypt(password) })
    ctx.body = { id: user.id, username: user.username }
  })
  .get('/', async ctx => {
    const { key } = <{ key: string }>ctx.query
    ctx.body = await UsersService.search(key)
  })
  .get('/:id', async ctx => {
    ctx.body = await UsersService.get(ctx.params.id)
  })
  .post('/:id/login', async ctx => {
    const { password } = ctx.request.body
    const u = await UsersService.get(+ctx.params.id)
    if (u === null)
      throw new HttpError('NOT_FOUND', '用户不存在')
    if (!Security.match(password, u.passwordHash))
      throw new HttpError('UNAUTHORIZED', '密码错误')
    ctx.body = 'you login.'
  })
  .get('/:id/logout', async ctx => {
    ctx.body = 'you logout.'
  })
  .post('/:id/friends/:uid', async ctx => {
    ctx.body = []
  })
  .get('/:id/friends', async ctx => {
    ctx.body = []
  })
  .get('/:id/channels', async ctx => {
    ctx.body = []
  })
  .del('/:id/channels/:cid', async ctx => {
    console.log(ctx.params)
  })
