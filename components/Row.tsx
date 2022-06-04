import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface RowProps {
  title: string
  movies: Movie[]
}

const Row: React.FC<RowProps> = ({ title, movies }) => {
  console.log('movies', movies.length)
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      {/* Left & Right Icons */}
      <div className="group relative md:-ml-2">
        <ChevronRightIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />

        {/* Here we are going to have a row of movies */}
        <div className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            //   Using the thumbnail component
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronLeftIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
      </div>
    </div>
  )
}

export default Row
