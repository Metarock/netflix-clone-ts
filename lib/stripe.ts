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

export { loadCheckout }
export default payments
