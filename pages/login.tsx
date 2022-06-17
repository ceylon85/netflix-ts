import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const {signIn, signUp} = useAuth()

  //유효성 검사
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> =
    async ({ email, password }) => {
      if (login) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
    }
  


  return (

    <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent '>
      <Head>
        <title>Netflix_Login</title>
      </Head>
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative max-w-[400px] max-y-[600px] px-10 py-10 mt-40 space-y-8 rounded bg-black/75  md:px-14 md:max-w-[500px] mx-auto ">
          <h1 className='text-2xl font-bold'>로그인</h1>
          <div className='space-y-4'>
            <label className='inline-block w-full' >
              <input type="email" placeholder='Email' className='input' {...register('email', { required: true })} />
              {errors.email && (
                <p className='p-1 text-sm font-light text-orange-400'>유효한 Email을 입력하세요!!</p>
              )}
            </label>
            <label className='inline-block w-full'>
              <input type="password" placeholder='PassWord' className='input' {...register('password', { required: true })} />
              {errors.password && (
                <p className='p-1 text-[13px] font-light text-orange-400'>비밀번호는 최소 4~12자 사이여야 합니다!!</p>
              )}
            </label>

          </div>

          <button className='bg-[#e50914] font-semibold input'
            onClick={() => setLogin(true)}>로그인</button>
          <div className='text-gray-400 '>
            <span> Netflix 회원이 아닌가요? </span>
            <button type='submit' className='text-white hover:underline' onClick={() => setLogin(false)}>지금 가입하세요</button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default Login