import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { BASE_URL, MOVIE_BASE_URL } from '../constants/movie'

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

  console.log('net ', netflixOriginals)

  return (
    <div>
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        {/* image nextjs compnent */}
        <Image
          src={`${MOVIE_BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p>{movie?.overview}</p>
    </div>
  )
}

export default Banner
