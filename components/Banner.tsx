import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import Image from 'next/image'
import { BASE_URL } from '../constants/movie'

interface BannerProps {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: BannerProps) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  // Get a random movie on banner by using the default math
  // floor and random via the netflix original length
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  console.log('movie ', movie)
  return (
    <div>
      <div className="absolute top-0 left-0">
        {/* image nextjs compnent */}
        <Image
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
        />
      </div>
    </div>
  )
}

export default Banner
