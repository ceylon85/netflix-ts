import { CheckIcon } from "@heroicons/react/outline"
import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import Table from "./Table"
import { Product } from '@stripe/firestore-stripe-payments'

interface Props {
    products: Product[];
}

function Plans({ products }: Props) {
    const { logout, user } = useAuth()
    console.log(products)
    return (
        <div>
            <Head>
                <title>Netflix App_TS</title>
            </Head>
            <header className="border-b border-white/10 bg=[#141414]">
                <Link href="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="main logo"
                        height={100}
                        width={100}
                        className="object-contain cursor-pointer " />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}>Logout </button>
            </header>

            <main className="max-w-5xl px-5 pb-12 mx-auto transition-all pt-28 md:px-10">
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
                        {products && products.map((product) => (
                            <div key={product.id} className="planBox">
                                {product.name}
                            </div>
                        ))}
                    </div>

                    <Table />
                    <button>다음</button>
                </div>
            </main>
        </div >
    )
}

export default Plans