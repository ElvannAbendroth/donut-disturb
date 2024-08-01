import { defineMiddleware } from 'astro:middleware'
import { projectAuth } from './utils/firebase'

export const onRequest = defineMiddleware((context, next) => {
  const currentUser = projectAuth.currentUser
  const { pathname } = context.url

  if (currentUser) {
    context.locals.user = {
      name: currentUser.displayName,
      email: currentUser.email,
    }
  }

  if (currentUser && (pathname === '/register' || pathname === '/login')) {
    return context.redirect('/')
  }

  return next()
})
