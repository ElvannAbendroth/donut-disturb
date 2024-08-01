import { projectAuth } from '@/utils/firebase'
import { defineAction, z } from 'astro:actions'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'

const provider = new GoogleAuthProvider()

export const createAccount = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ email, password }) => {
    await createUserWithEmailAndPassword(projectAuth, email, password)
  },
})

export const loginAccount = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  handler: async ({ email, password }) => {
    await signInWithEmailAndPassword(projectAuth, email, password)
  },
})

export const loginWithGoogle = defineAction({
  accept: 'form',
  input: z.object({}),
  handler: async ({}) => {
    await signInWithPopup(projectAuth, provider)
  },
})

export const logoutAccount = defineAction({
  handler: async () => {
    await projectAuth.signOut()
  },
})

export const server = {
  createAccount,
  loginAccount,
  logoutAccount,
  loginWithGoogle,
}
