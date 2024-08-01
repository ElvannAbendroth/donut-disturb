import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import { projectAuth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import Icon from './ui/icon'
import { useToast } from './ui/use-toast'

interface LoginFormProps {}

const provider = new GoogleAuthProvider()

const LoginForm: FC<LoginFormProps> = () => {
  const { toast } = useToast()

  const handleLogin = () => {
    console.log('Login with Google')

    signInWithPopup(projectAuth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const newUser = result.user
        toast({
          variant: 'default',
          title: 'Success!',
          description: `Logged In as ${newUser.displayName}`,
        })
      })
      .catch(error => {
        console.log({
          errorCode: error.code,
          errorMessage: error.message,
          email: error.customData.email,
          credential: GoogleAuthProvider.credentialFromError(error),
        })
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: `Failed to Authenticate`,
        })
      })
  }

  const handleLogout = () => {
    console.log('Sign Out')
    signOut(projectAuth)
      .then(result => {
        toast({
          variant: 'default',
          title: 'Success!',
          description: `Logged Out!`,
        })
      })
      .catch((error: any) => {
        console.log({
          errorCode: error.code,
          errorMessage: error.message,
          email: error.customData.email,
          credential: GoogleAuthProvider.credentialFromError(error),
        })
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: `There was a problem login out, check the console for more info`,
        })
      })
  }
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleLogin}>
        <svg className="fill-primary-foreground  size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
        </svg>
        Login with Google
      </Button>

      <Button onClick={handleLogout} variant={'accent'}>
        <Icon name="LogOut" className="size-4" />
        Sign Out
      </Button>
      <p>{projectAuth.currentUser ? projectAuth.currentUser.displayName : ''}</p>
    </div>
  )
}

export default LoginForm
