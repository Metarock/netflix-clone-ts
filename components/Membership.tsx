import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Loader } from '.'
import useAuth from '../hooks/useAuth'
import userSubscription from '../hooks/userSubscription'
import { userBillingPortal } from '../lib/stripe'

const Membership = () => {
  const { user } = useAuth()
  const subscription = userSubscription(user)
  const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false)

  const manageSubscription = () => {
    // if subscription exists; or user has subscription
    if (subscription) {
      setIsBillingLoading(true)
      // goes to billing portal

      userBillingPortal()
    }
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-0 md:px-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray ]">Membership & Billing</h4>
        {/* managing our subscription */}
        <button
          disabled={isBillingLoading || !subscription}
          className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          {isBillingLoading ? (
            <Loader color="dark:fill-[#e50914]" />
          ) : (
            'Cancel Membership'
          )}
        </button>
      </div>
    </div>
  )
}

export default Membership
