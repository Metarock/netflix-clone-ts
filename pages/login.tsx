import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface InputTypes {
  email: string
  password: string
}

const login = () => {
  const [login, setLogin] = useState<boolean>(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>()

  //   We need to track if the user is login or signing up
  const onSubmit: SubmitHandler<InputTypes> = async ({ email, password }) => {
    // if click on login
    if (login) {
      // sign in
      await signIn(email, password)
    } else {
      // sign up
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* show image when not in phone mode */}
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      {/* logo image */}
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      {/* Register / Login form */}
      {/* Background of the form appears on bigger screen*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register('email', { required: true })}
              type={'email'}
              placeholder="Email"
              className="input"
            />
            {/* Display error */}
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                This field is required
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              {...register('password', { required: true })}
              type={'password'}
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        {/* button */}
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>

        {/* for sign up */}
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            onClick={() => setLogin(false)}
            type="submit"
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default login
