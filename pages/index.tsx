import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  fantasyMovies: Movie[]
  familyMovies: Movie[]
  documentaries: Movie[]
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
  // mysteryMovies,
  // historyMovies,
}: Props) => {
  //console.log(netflixOriginals, trendingNow);
  const { logout, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix App_TS</title>
      </Head>
      <Header />
      <main className='relative pb-24 pl-4 lg:space-y-24 lg:pl-16'>
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
    }
  }
}