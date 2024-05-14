import { publicProcedure, router } from './trpc'
export const appRouter = router({
  test: publicProcedure.query(() => {
    return 'Hello from trpc!'
  }),
})
export type AppRouter = typeof appRouter
