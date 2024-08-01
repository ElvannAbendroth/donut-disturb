import { firebaseConfig } from '@/utils/config'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
export const projectAuth = getAuth(app)
