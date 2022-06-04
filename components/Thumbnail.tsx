import Image from 'next/image'
import { MOVIE_BASE_URL_500 } from '../constants/constants'
import { Movie } from '../typings'

interface ThumbnailProps {
  movie: Movie
}

const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
  return (
    <div className="relative h-28 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`${MOVIE_BASE_URL_500}${
          movie?.backdrop_path || movie?.poster_path
        }`}
        layout="fill"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  )
}

export default Thumbnail
