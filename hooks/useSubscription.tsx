import { onCurrentUserSubscriptionUpdate, Subscription } from "@stripe/firestore-stripe-payments"
import { User } from "firebase/auth"
import { useEffect, useState } from "react"
import payments from "../lib/stripe"

//구독 관련 커스텀 hook, 사용자 구독때마다 업데이트 되거나
function useSubscription(user: User | null) {
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    useEffect(() => {
        if (!user) return

        onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
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

export default useSubscription