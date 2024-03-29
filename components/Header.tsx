import { SearchIcon } from '@heroicons/react/outline'
import { GiftIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router'
import BasicMenu from './BasicMenu';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout } = useAuth()
    const [dropdown, setDropdown] = useState(false);
    const router = useRouter();

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

    const handleDropdown = () => {
        if (!dropdown) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    };
    return (
        <header className={`${isScrolled && "bg-black"}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <Link href="/" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="main logo" height={100} width={100} className="object-contain cursor-pointer "/>
                </Link>

                <BasicMenu />
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
                <div className='flex items-center mr-[20px] cursor-pointer '>

                    <Link href=''>
                        <img src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZ2mdn_92ruEqx0QzXDv947nXRyeamVpcKT4xbR6N-51JGWihqgKLLIX9gO_E319FW3Qoqff4ujjappyQ8uskyFS6Q.png?r=a41" alt="profile" className='rounded ' width={30} height={30} />
                    </Link>
                    <ChevronDownIcon className='w-6 sm:inline ' onClick={handleDropdown} />
                    {dropdown && (
                        <div
                            className="absolute sm:right-[3%] sm:top-[68px] w-44 ml-0 p-0 bg-black/80 z-100 right-[4%] top-[52px] !border-[gray] !border"
                            // onMouseLeave={handleDropdown}
                            onClick={handleDropdown}
                        >
                            <ul className="list-none p-1.5">
                                <li className="pt-2 dropdownProfile">
                                    <img
                                        src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYgoIFuP4_E0zjNm4v8w6iCy69xVG0gEJgeLjbl7VR3GBolfveZOeKR0RXL1sHzRdidE4Prff-FSWhZmRICew4Zm9Q.png?r=f71"
                                        alt=""
                                        className='profileAvatar'
                                    />
                                    <p className='m-0 font-normal'>Profile 2</p>
                                </li>
                                <li className="dropdownProfile">
                                    <img
                                        src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYfwTxmicFHiE-E3haGy5fndgVeLFsF__2XdxoXTGyNdahQG3Zoix8YpO5Ij7oHpiGr0S8GJszzKUltRYtg42mPEsQ.png?r=b97"
                                        alt=""
                                        className='profileAvatar'

                                    />
                                    <p className='m-0 font-normal'>Profile 3</p>
                                </li>
                                <li className="mb-1 dropdownProfile">
                                    <img
                                        src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQ_5NlU6oiEjm2-0Nq0k3GkoO5x3lSaB4zMq2ggg-NHsLQa5QTAGV3J_Gn2C27_1zzCXwkBxggt4Syl00Z2NqFsQnQ.png?r=fcd"
                                        alt=""
                                        className='profileAvatar'

                                    />
                                    <p className='m-0 font-normal'>키즈</p>
                                </li>
                            </ul>
                            <div className='!text-[#b3b3b3] hover:!text-white '>
                                <p className='px-5 py-[5px] cursor-pointer font-normal border-b-[.8px]  pt-0'>프로필 관리</p>
                            </div>
                            <ul className="profileAccount">
                                <li className="!text-[#b3b3b3] hover:!text-white" onClick={() => router.push("/account")}>계정</li>
                                <li className="!text-[#b3b3b3] hover:!text-white ">고객 센터</li>
                                <li className="!text-[#b3b3b3] hover:!text-white  hover:underline" onClick={logout}>로그아웃</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header