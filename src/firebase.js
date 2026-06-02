import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  increment,
} from 'firebase/firestore'

// Firebase web config. These values are NOT secret; they ship in client code.
// Access is controlled by firestore.rules, not by hiding these.
const firebaseConfig = {
  apiKey: 'AIzaSyCBZorBl4oLUjEpbDVQh-Gl7W0G7cYO1Yg',
  authDomain: 'marcus-viscardi-profile.firebaseapp.com',
  projectId: 'marcus-viscardi-profile',
  storageBucket: 'marcus-viscardi-profile.firebasestorage.app',
  messagingSenderId: '265341386283',
  appId: '1:265341386283:web:27d4317675dcd49ac7f46e',
  measurementId: 'G-XWQMCNV2CR',
}

export const firebaseReady = firebaseConfig.projectId !== 'REPLACE_ME'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Read every reaction tally. Returns a plain { projectId: count } map.
export async function fetchCounts() {
  const snap = await getDocs(collection(db, 'reactions'))
  const out = {}
  snap.forEach((d) => {
    out[d.id] = d.data().count || 0
  })
  return out
}

// Add (or remove) one reaction for a project. delta is +1 or -1.
export async function bumpReaction(id, delta) {
  await setDoc(
    doc(db, 'reactions', id),
    { count: increment(delta) },
    { merge: true }
  )
}
