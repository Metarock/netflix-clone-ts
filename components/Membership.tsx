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

      {/* TODO : ADD functionality to membership links, for now its static */}
      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Change Email</p>
            <p className="membershipLink">Change Password</p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? 'Your subscription will end on '
                : 'Your next billing data is'}{' '}
              {subscription?.current_period_end}
            </p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Manage Payment Info</p>
            <p className="membershipLink">Add Another Payment Method</p>
            <p className="membershipLink">Billing Details</p>
            <p className="membershipLink">Change Billing Day</p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership
