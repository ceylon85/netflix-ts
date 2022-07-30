import { CheckIcon } from "@heroicons/react/outline"
import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import Table from "./Table"
import { Product } from '@stripe/firestore-stripe-payments'
import { useState } from "react"
import Loader from './Loader'
import { loadCheckout } from "../lib/stripe"

interface Props {
    products: Product[];
}

function Plans({ products }: Props) {
    const { logout, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])//기본 프리미엄으로 선택
    const [isBillingLoading, setBillingLoading] = useState(false)

    console.log(products[2])

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }

    return (
        <div className="text-black bg-white">
            <Head>
                <title>Netflix App_TS</title>
            </Head>
            <header className="relative border-b border-gray-500/10">
                <Link href="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="main logo"
                        height={100}
                        width={100}
                        className="object-contain w-[75px] h-[20px] sm:w-[10rem] sm:h-[3rem] cursor-pointer " />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}>로그아웃</button>
            </header>

            <main className="max-w-5xl px-5 pt-5 pb-12 mx-auto transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium ">원하는 멤버십을 선택하세요.</h1>
                <ul>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> 광고 없이 무제한으로 시청.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> 취향에 맞는 콘텐츠를 추천해 드립니다.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> 멤버십은 언제든지 변경 또는 해지 가능.
                    </li>
                </ul>

                {/* Plan */}
                <div className="flex flex-col mt-4 space-y-4">
                    <div className="flex items-center self-end justify-end w-full md:w-3/5">
                        {products.map((product) => (
                            <div key={product.id}
                                className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' && 'selectPlanBox' : 'opacity-60'
                                    }`}
                                onClick={() => setSelectedPlan(product)}>
                                {product.name}
                            </div>
                        ))}
                    </div>

                    <Table products={products} selectedPlan={selectedPlan} />
                    <small className="text-[#737373] text-xs">
                        <span>HD(720p), 풀 HD(1080p), UHD(4K), HDR 화질 제공 여부는 사용하는 인터넷 서비스와 디바이스의 성능에 따라 달라질 수 있습니다. 모든 콘텐츠가 모든 화질로 제공되지는 않습니다. 자세한 내용은 <a className="text-blue-600" href="https://help.netflix.com/legal/termsofuse" target="_blank">이용 약관</a>을 확인하세요.</span>

                    </small>
                    <small className="text-[#737373] text-xs">
                        <span>한집에 사는 사람들만 계정을 함께 이용할 수 있습니다. 프리미엄 멤버십은 동시접속 4명, 스탠다드 멤버십은 2명, 베이식 멤버십은 1명까지 가능합니다.
                        </span>
                    </small>
                    <button
                        disabled={!selectedPlan || isBillingLoading} //선택한 멤버십이 없거나 결제 로딩일때
                        className={`text-white mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-300" />
                        ) : (
                            '구독'
                        )}
                    </button>                </div>
            </main>
        </div >
    )
}

export default Plans