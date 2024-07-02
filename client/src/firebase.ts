// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAzicqdpaKgdDHqZBMClwvyl-pLK6n9RCo',
  authDomain: 'stockcarter-d44e0.firebaseapp.com',
  projectId: 'stockcarter-d44e0',
  storageBucket: 'stockcarter-d44e0.appspot.com',
  messagingSenderId: '878158465502',
  appId: '1:878158465502:web:27cdbecacdf4e481d6754f',
  measurementId: 'G-YERT4T7W0P',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)

export { app, analytics, auth }
