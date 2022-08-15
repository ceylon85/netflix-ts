import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { goToBillingPortal } from '../lib/stripe'
import Loader from './Loader'

function Membership() {
    const { user } = useAuth()
    const subscription = useSubscription(user)
    const [isBillingLoading, setBillingLoading] = useState(false)
    
    const manageSubscription = () => {
        if (subscription) {
            setBillingLoading(true)
            goToBillingPortal()
        }
    }

    console.log(subscription)
    return (
        <div className="grid grid-cols-1 px-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
            <div className="py-4 space-y-2">
                <h4 className="text-lg text-[gray]">멤버십 & 결제정보</h4>
                <button
                    disabled={isBillingLoading || !subscription}
                    className="w-3/5 h-10 py-2 font-medium text-black bg-gray-300 shadow-md text-normal whitespace-nowrap hover:bg-gray-200 md:w-4/5"
                    onClick={manageSubscription}
                >
                    {isBillingLoading ? (
                        <Loader color="fill-[#e50914]" />
                    ) : (
                        '멤버십 해지'
                    )}
                </button>
            </div>
        </div>

    )
}

export default Membership