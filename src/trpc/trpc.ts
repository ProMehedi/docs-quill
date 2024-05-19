import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.create()

const isAuth = t.middleware(async (opts) => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (user === undefined || !user.id || !user.email) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: { userId: user.id, user },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
