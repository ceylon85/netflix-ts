import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  // topRated: Movie[]
  // actionMovies: Movie[]
  // comedyMovies: Movie[]
  // animation: Movie[]
  // fantasyMovies: Movie[]
  // familyMovies: Movie[]
  // romanceMovies: Movie[]
  // documentaries: Movie[]
  // mysteryMovies: Movie[]
  // historyMovies: Movie[]

}
const Home = ({
  netflixOriginals,
  trendingNow,

  // topRated,
  // actionMovies,
  // comedyMovies,
  // animation,
  // fantasyMovies,
  // familyMovies,
  // romanceMovies,
  // documentaries,
  // mysteryMovies,
  // historyMovies,
}: Props) => {
  //console.log(netflixOriginals, trendingNow);
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix App_TS</title>
      </Head>
      <Header />
      <main>
        <Banner netflixOriginals={netflixOriginals} />
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

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    animations,
    fantasyMovies,
    familyMovies,
    romanceMovies,
    documentaries,
    mysteryMovies,
    historyMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchAnimations).then((res) => res.json()),
    fetch(requests.fetchFantasyMovies).then((res) => res.json()),
    fetch(requests.fetchFamilyMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
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
      animations: animations.results,
      fantasyMovies: fantasyMovies.results,
      familyMovies: familyMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      mysteryMovies: mysteryMovies.results,
      historyMovies: historyMovies.results,
    }
  }
}