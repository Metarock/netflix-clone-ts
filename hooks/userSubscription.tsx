import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import payments from '../lib/stripe'

const userSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    // if there is no user
    if (!user) return

    // A listener on subscription, tracking the user's subscription
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      // retrieve the snapshot
      // ONLY GET active or trailing
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0]
      )
    })
  }, [user])

  return subscription
}

export default userSubscription
