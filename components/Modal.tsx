import { XIcon } from '@heroicons/react/solid'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)

  useEffect(() => {
    if (!movie) return

    async function fetchMovies() {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TDMB_APIKEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      //   if (data?.videos) {
      //     const index = data.videos.results.findIndex()
      //   }

      console.log('modal', movie)
    }
    fetchMovies()
  }, [movie])
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div></div>
      </>
    </MuiModal>
  )
}

export default Modal
