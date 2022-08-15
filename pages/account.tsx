import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Membership from '../components/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'

interface Props {
    products: Product[];
}

function Account({ products }: Props) {
    const { user, logout } = useAuth()
    const subscription = useSubscription(user)
    console.log(products)
    return (
        <div>
            <Head>
                <title>계정 설정</title>
            </Head>
            <Header />

            <main className='max-w-6xl px-5 pt-24 pb-12 mx-auto transition-all md:px-10'>
                <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
                    <h1 className='text-3xl md:text-4xl'>
                        계정
                    </h1>
                    <div className='-ml-0.5 flex items-center gap-x-1.5'>
                        <img src="https://rb.gy/4vfk4r" alt="" className='w-7 h-7' />
                        <p className='text-xs font-semibold text-[#555]'>다음 결제 날짜는 {subscription?.created}입니다</p>
                    </div>
                </div>

                <Membership/>
                <div className='grid grid-cols-1 px-4 py-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
                    <h4 className='text-lg text-[gray]'>멤버십 상세 정보</h4>
                    {/* 현재 구독 멤버십 찾기 */}
                    <div className="col-span-2 font-medium">
                        {
                            products.filter(
                                (product) => product.id === subscription?.product
                            )[0]?.name
                        }
                    </div>
                    <p
                        className="text-blue-500 cursor-pointer hover:underline md:text-right"
                    >
                        멤버십 변경
                    </p>
                </div>

                <div className="grid grid-cols-1 px-4 py-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
                    <h4 className="text-lg text-[gray]">설정</h4>
                    <p
                        className="col-span-3 text-blue-500 cursor-pointer hover:underline"
                        onClick={logout}
                    >
                        모든 디바이스에서 로그아웃
                    </p> 
                   
                </div>
            </main>
        </div>
    )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch((error) => console.log(error.message))

    return {
        props: {
            products,
        },
    }
}