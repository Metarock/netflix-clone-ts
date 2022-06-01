import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    // gradient to bottom
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header navigation component */}
      <Header />
      <main>
        {/* Banner coponent*/}
        <Banner />
        <section>{/* Rows component */}</section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home
