import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Netflix App_TS</title>
      </Head>
      <Header />
      <main>
        {/* Banner */}
        <section>
          {/* Row */}
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div>number</div>
      </footer>
    </div>
  )
}

export default Home
