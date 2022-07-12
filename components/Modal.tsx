import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import ReactPlayer from 'react-player/lazy'
import { Element, Genre, Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'


function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)
  const [addedToList, setAddedToList] = useState(false)

  useEffect(() => {
    // movie가 없으면 리턴
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        // index를 제공하고 싶은 비디오 결과의 키
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
  }, [movie])


  const handleClose = () => {
    setShowModal(false);
    setMovie(null)
  }
  console.log(trailer)

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className="absolute modalButton right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
          <XIcon className='w-6 h-6' />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="text-black h-7 w-7" />
                Play
              </button>
              <button className="modalButton">
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="w-6 h-6" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? (
                <VolumeOffIcon className="w-6 h-6" />
              ) : (
                <VolumeUpIcon className="w-6 h-6" />
              )}</button>
          </div>
        </div>

        <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                {movie!.vote_average * 10}% Match
              </p>
              <p className='font-light'>
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className='flex items-center justify-center h-4 rounded border border-white/40 px-1.5 text-xs'>HD</div>
            </div>

            <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[#b0ee33]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[#b0ee33]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[#b0ee33]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )

}

export default Modal