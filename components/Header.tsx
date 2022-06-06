import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

// Wont need to import react for nextjs
const Header = () => {
  // Use States
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { logout } = useAuth()

  // load content at single mount
  useEffect(() => {
    const handleScroll = () => {
      // check if page scroll Y is greater than 0
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Listen to scroll
    window.addEventListener('scroll', handleScroll)

    return () => {
      //Remove the event listener
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      {/* Left */}
      <div className="flex items-center space-x-2 md:space-x-10">
        {/* svg elements */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        {/* Hide the navbars when on mobile */}
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      {/* Right */}
      {/* Hide the search icon when not on mobile */}
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href={'/account'}> */}
        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
