import Head from 'next/head'
import React from 'react'

function Login() {
  return (
    <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix App</title>
      </Head>
      <img
        className="-z-10 !hidden opacity-60 sm:!inline bg-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/180ca992-4d7b-4274-99be-cf8169176af2/KR-ko-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="bg"
      />
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="main logo" height={150} width={150} className="absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6 "
      />
      <form action=""><h1>Sign In</h1>
        <div><label htmlFor="">
          <input type="email" placeholder='Email' /></label>
          <label></label></div>
      </form>
    </div>

  )
}

export default Login