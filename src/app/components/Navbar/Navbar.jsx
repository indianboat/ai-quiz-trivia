import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <header className="z-40 w-full 2xl:container mx-auto border-b sticky top-0 bg-white/90 backdrop-blur-[3px]">
        <nav className="max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 mx-auto py-4" aria-label="navbar">
          <div className="md:col-span-3">
            <Link className="flex-none rounded-xl text-2xl inline-block font-semibold focus:outline-none text-black"
              href="/" aria-label="brand-name">
              Quiz Trivia
            </Link>
          </div>

          <div className="flex items-center gap-x-2 ms-auto py-1 md:order-3 md:col-span-3">
            <Link href={"/"} className="py-2 px-3 lg:flex md:flex sm:hidden hidden items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-gray-800 hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">
              Sign up
            </Link>

            <div className="lg:hidden md:hidden sm:flex flex">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-white-900 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:hover:bg-neutral-700"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div id="navbar-collapse-with-animation" className="hs-collapse hidden transition-all md:overflow-visible overflow-hidden duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6">
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
              <div>
                <Link
                  className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white"
                  href="/"
                  aria-current="page"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  href="#!">
                  About
                </Link>
              </div>
              <div>
                <Link className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  href="#!">
                  Contact
                </Link>
              </div>
              <div>
                <Link className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  href="#!">
                  Sign in
                </Link>
              </div>
              <div className='lg:hidden md:hidden sm:flex flex'>
                <Link className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  href="#!">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar