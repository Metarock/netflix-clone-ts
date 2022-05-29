// Wont need to import react for nextjs
const Header = () => {
  return (
    <header>
      {/* Left */}
      <div>
        {/* svg elements */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul></ul>
      </div>
      {/* Right */}
      <div></div>
    </header>
  )
}

export default Header
