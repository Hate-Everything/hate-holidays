import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  query,
  collection,
  getDocs,
  addDoc,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const initUserHolidays = (userId, username, dates) => {
  const userHolidaysRef = collection(db, 'userHolidays')
  return addDoc(userHolidaysRef, {
    id: userId,
    name: username,
    holidays: dates,
  })
}

const getUserHolidays = async () => {
  const querySnapshot = await getDocs(collection(db, 'userHolidays'))
  const results = []
  if (querySnapshot.empty) {
    return results
  }
  querySnapshot.forEach((data) => {
    results.push(data.data())
  })
  return results
}

const getUserHolidaysByUserId = async (userId) => {
  const q = query(collection(db, 'userHolidays'), where('id', '==', userId))
  const querySnapshot = await getDocs(q)
  const results = []
  if (querySnapshot.empty) {
    return results
  }
  querySnapshot.forEach((data) => {
    const result = data.data()
    result.firebaseKey = data.id
    results.push(result)
  })
  return results.length > 0 ? results[0] : results
}

const updateUserHolidays = async (firebaseKey, holidays) => {
  const userHolidaysRef = doc(db, 'userHolidays', firebaseKey)
  await updateDoc(userHolidaysRef, { holidays })
}

export default {
  getUserHolidays,
  getUserHolidaysByUserId,
  initUserHolidays,
  updateUserHolidays,
}
