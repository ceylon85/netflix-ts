import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
 
function Account() {
    const {user}  = useAuth()
    const subscription = useSubscription(user)

    return (
        <div>
            <Head>
                <title>계정 설정</title>
            </Head>
            <Header />
          <main className='pt-20'> 
            <div>
                <h1 className='text-3xl md:text-4xl'>
                    계정 설정
                </h1>
                <div>
                    <img src="" alt="" />
                    <p>다음 결제 날짜는 {subscription?.created}입니다</p>
                </div>
            </div>
          </main>
        </div>
    )
}

export default Account
