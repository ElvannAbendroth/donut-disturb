import { projectAuth } from '@/utils/firebase'
import { GoogleAuthProvider, getRedirectResult, signInWithPopup } from 'firebase/auth'

const loginButton = document.querySelector('#login-google') as HTMLFormElement

loginButton.addEventListener('submit', async e => {
  e.preventDefault()
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(projectAuth, provider)

    const result = await getRedirectResult(projectAuth)
    console.log(result)
    // return result
  } catch (error) {
    console.log(error)
  }

  window.location.reload()
})
