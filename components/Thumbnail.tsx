import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { MOVIE_BASE_URL_500 } from '../constants/constants'
import { Movie } from '../typings'

interface ThumbnailProps {
  // When using firebase we add type DocumentData
  movie: Movie | DocumentData
}

const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
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
