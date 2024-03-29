import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Movie } from '../typings'
import { baseUrl } from '../constants/movie'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])
    console.log(movie)// 배너에 뜨는 영화의 정보

    return (
        <div className='flex flex-col py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>

            <div className='top-0 left-0 absolute -z-10 h-[95vh] w-screen object-contain'>
                <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill'
                    objectFit='cover' />
            </div>
            {/* Banner Title */}
            <h1 className='text-2xl font-bold lg:mt-2 lg:text-6xl md:text-4xl'>{movie?.title || movie?.name || movie?.original_name}</h1>
            {/* Banner Description */}
            <p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{(movie?.overview?.slice(0, 150).concat('...'))}</p>

            <div className='flex space-x-3'>
                <button className='text-[#000] bg-red-50 hover:bg-red-100 bannerButton'>
                    <FaPlay className='w-4 h-4 md:h-7 md:w-7' />Play
                </button>
                <button className='bannerButton bg-[gray]/70'
                    onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}>More Info
                    <FaInfoCircle className='w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8' />
                </button>
            </div>
            {/* fade--bottom */}
            {/* <div className='h-[7.4rem] lg:h-[7.4rem] bg-gradient-to-b   from-black to-gray-800 '></div> */}
        </div>
    )
}

export default Banner