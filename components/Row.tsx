import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface RowProps {
  // When using firebase we add type DocumentData
  title: string
  movies: Movie[]
}

const Row: React.FC<RowProps> = ({ title, movies }) => {
  //   Have a reference
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  const handleClick = (direction: string) => {
    // set move to true; whether it be right or left
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      //get the div container based on the clientWidth
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      //   Scroll function via the reference
      //   Smoothly scroll via the behavior
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      {/* Left & Right Icons */}
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />

        {/* Here we are going to have a row of movies */}
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            //   Using the thumbnail component
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => handleClick('right')}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
      </div>
    </div>
  )
}

export default Row
