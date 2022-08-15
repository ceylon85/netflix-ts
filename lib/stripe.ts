import {
    createCheckoutSession,
    getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../firebase'

// firebase 구성

const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
})

const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    })
        .then((snapshot) => window.location.assign(snapshot.url))
        .catch((error) => console.log(error.message))
}

const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'us-central1')//기본 GCP위치와 다름
    const functionRef = httpsCallable(instance, 'ext-firestore-stripe-payments-createPortalLink')

    await functionRef({
        returnUrl: `${window.location.origin}/account`,
    })
        .then(({ data }: any) => window.location.assign(data.url))
        .catch((error) => console.log(error.message))
}


export { loadCheckout, goToBillingPortal }
export default payments