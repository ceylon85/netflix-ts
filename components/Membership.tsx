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
            <div className='col-span-3'>
                <div className="flex flex-col justify-between py-4 border-b border-white/10 md:flex-row">
                    <div>
                        <p className="font-medium">{user?.email}</p>
                        <p className="text-[gray]">비밀번호: ****** </p>
                        <p className="text-[gray]">전화번호: 010 123 4567  { } </p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">이메일주소 변경</p>
                        <p className="membershipLink">비밀번호 변경</p>
                        <p className="membershipLink">휴대폰 번호 등록</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                    <div>
                        <p>
                            {subscription?.cancel_at_period_end
                                ? 'Your membership will end on '
                                : '다음 결제일 '}
                            {subscription?.current_period_end}
                        </p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">결제 정보 관리</p>
                        <p className="membershipLink">결제 상세정보</p>
                        <p className="membershipLink">결제일 변경</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Membership