import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Loader } from '.'
import useAuth from '../hooks/useAuth'
import { loadCheckout } from '../lib/stripe'
import Table from './Table'

interface PlanProps {
  products: Product[]
}

const Plans = ({ products }: PlanProps) => {
  const { logout, user } = useAuth()

  // accept a single product
  // by default we want the best(last) plan to be select4ed
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
  const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false)

  // function
  const subscribeToPlan = () => {
    // if there is no user
    if (!user) return

    const priceId = selectedPlan?.prices[0].id

    // if id is null / undefined
    if (!priceId) {
      throw new Error('Plan price is called but id is null')
    }

    loadCheckout(priceId)

    // set the loading state to true
    setIsBillingLoading(true)
  }

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414]">
        {/* nextflix logo */}
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      {/* The plan body */}
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">Choose the right plan!</h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" />
            Recommendations just for you
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        {/* The plans */}
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {/* plans */}
            {products.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => setSelectedPlan(product)}
                key={product.id}
              >
                {product.name}
              </div>
            ))}
          </div>

          {/* Table component */}
          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {/* show loading bar  */}
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans
