import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

function Login() {
  
  return (
    <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent '>

      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/180ca992-4d7b-4274-99be-cf8169176af2/KR-ko-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        className="opacity-80 sm:inline"
        alt="bg_cover"
        objectFit='cover'
        layout='fill'
      />
      <div className='relative z-[1] w-full h-[100vh] bg-black/40 bg-gradient-to-t'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="main logo" height={100} width={150} className="absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6 "
        />

        <form className="relative max-w-[400px] max-y-[600px] px-10 py-10 mt-40 space-y-8 rounded bg-black/75  md:px-14 md:max-w-[500px] mx-auto ">
          <h1 className='text-2xl font-bold'>로그인</h1>
          <div className='space-y-3'>
            <label className='inline-block w-full' >
              <input type="email" placeholder='Email' className='input' />
            </label>
            <label className='inline-block w-full'>
              <input type="password" placeholder='PassWord' className='input' />
            </label>

          </div>

          <button className='bg-[#e50914] font-semibold input'>로그인</button>
          <div className='text-gray-400 '>
            <span> Netflix 회원이 아닌가요? </span>
            <button type='submit' className='text-white hover:underline'>지금 가입하세요</button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default Login