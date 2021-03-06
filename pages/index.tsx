import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Banner, Header, Modal, Plans, Row } from '../components'
import useAuth from '../hooks/useAuth'
import userCustomList from '../hooks/userCustomList'
import userSubscription from '../hooks/userSubscription'
import payments from '../lib/stripe'
import { Movie } from '../typings'
import requests from './api/requests'

// server side rendering, NAMING IS IMPORTANT
export const getServerSideProps: GetServerSideProps = async () => {
  // only give active plans
  // NOTE: WE NEED TO USE next-transpile-modules, as nextjs as hot reloading
  // meaning nextjs is not transpiling node modules correctly
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))
  // fetch the api

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  }
}

interface NetFlixProps {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: NetFlixProps) => {
  const { loading, user } = useAuth()
  const subscription = userSubscription(user)
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const list = userCustomList(user?.uid)

  // Have a subscription that checks authentication
  if (loading || subscription === null) return null

  if (!subscription) return <Plans products={products} />

  return (
    // gradient to bottom
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header navigation component */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner coponent*/}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          {/* Rows component */}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List component */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Horror Films" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
    </div>
  )
}

export default Home
