import { SearchIcon } from '@heroicons/react/outline'
import { GiftIcon, BellIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false);
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && "bg-red-500"}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="main logo" height={100} width={100} className="object-contain cursor-pointer " />

                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">홈</li>
                    <li className="headerLink">TV프로그램 </li>
                    <li className="headerLink">영화</li>
                    <li className="headerLink">최신 등록 콘텐츠</li>
                    <li className="headerLink">내가 찜한 콘텐츠</li>
                </ul>
            </div>

            <div className='flex items-center space-x-3 text-sm'>
                <SearchIcon className='hidden w-6 h-6 sm:inline' />
                <p className='hidden lg:inline'>키즈</p>
                <GiftIcon className='w-6 h-6 sm:inline' />
                <BellIcon className='w-6 h-6 sm:inline' />
                <Link href=''>
                    <img src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZ2mdn_92ruEqx0QzXDv947nXRyeamVpcKT4xbR6N-51JGWihqgKLLIX9gO_E319FW3Qoqff4ujjappyQ8uskyFS6Q.png?r=a41" alt="profile" className='rounded cursor-pointer' width={30} height={30} />
                </Link>
            </div>
        </header>
        // heroIcon의 장점: table과 클래스를 제공
    )
}

export default Header