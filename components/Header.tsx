// Wont need to import react for nextjs
const Header = () => {
  return (
    <header>
      {/* Left */}
      <div className="flex items-center space-x-2 md:space-x-10">
        {/* svg elements */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      {/* Right */}
      <div className=""></div>
    </header>
  )
}

export default Header
