import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  fantasyMovies: Movie[]
  familyMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
  // mysteryMovies: Movie[]
  // historyMovies: Movie[]

}
const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  fantasyMovies,
  familyMovies,
  documentaries,
  products,
  // mysteryMovies,
  // historyMovies,
}: Props) => {
  //console.log(products) firebase 데이터 확인 완료
  //console.log(netflixOriginals, trendingNow);
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);

  // const [showModal, setShowModal] = useState(false);
  if (loading || subscription == null) return null;

  if (!subscription) return <Plans products={products} />

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && "!h-screen overflow-hidden"}`}>
      <Head>
        <title>Netflix App_TS</title>
      </Head>
      <Header />
      <main className='relative pb-24 pl-4 bg-red-600 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className='md:space-y-24'>
          <Row title="NETFLIX ORIGINALS" movies={netflixOriginals} />

          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Actions" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          {/* My List Component */}
          <Row title="Fantasy Movies" movies={fantasyMovies} />
          <Row title="Family Movies" movies={familyMovies} />
          <Row title="Documentaries" movies={documentaries} />

        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
      {/* <footer className="flex items-center justify-center w-full h-24 border-t">
        <div>number</div>
      </footer> */}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  // firebase와 stripe로 연동된 products data(멤버십 관련 데이터)
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    fantasyMovies,
    familyMovies,
    documentaries,
    mysteryMovies,
    historyMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchFantasyMovies).then((res) => res.json()),
    fetch(requests.fetchFamilyMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchMysteryMovies).then((res) => res.json()),
    fetch(requests.fetchHistoryMovies).then((res) => res.json()),
  ])
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      fantasyMovies: fantasyMovies.results,
      familyMovies: familyMovies.results,
      documentaries: documentaries.results,
      mysteryMovies: mysteryMovies.results,
      historyMovies: historyMovies.results,
      products,
    }
  }
}