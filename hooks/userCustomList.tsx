import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { snapshot_UNSTABLE } from 'recoil'
import { db } from '../firebase'
import { Movie } from '../typings'

const userCustomList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([])

  useEffect(() => {
    if (!uid) return

    // go inside collection of customers and go inside the document of the user; inside that we will
    // retrieve a collection called myList
    return onSnapshot(
      collection(db, 'customers', uid, 'myList'),
      (snapshot) => {
        setList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }
    )
  }, [db, uid])

  return list
}

export default userCustomList
