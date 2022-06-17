import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../firebase'

// Accept two things: 1) instance of the app, 2) options
const payments = getStripePayments(app, {
  productsCollection: 'plans',
  customersCollection: 'customers',
})

const loadCheckout = async (priceId: string) => {
  // create checkout
  // send the url to the current window
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    // if all of this is successful,
    // user will be prompted to a stripe payment portal
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((err) => console.log(err.message))
}

const userBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1')

  // returns a url which is the user billing portal based on the cloud function reference
  const functionRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  )

  // If user pays successful, redirect them back to the account page based on the current domain
  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message))
}

export { loadCheckout, userBillingPortal }
export default payments
