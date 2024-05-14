import React from 'react'
import { GithubIcon } from '../Svg/Icons'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className="footer bg-gray-100 border-t flex justify-center relative z-50">
        <p className='py-4 text-sm text-gray-500 inline-flex items-center gap-2 select-none'>
          &copy; CopyRight | All Right Reserved | QuizTrivia 2024 | Made by <Link href="https://github.com/indianboat" target="_blank" className='cursor-pointer hover:text-gray-900'><GithubIcon width={16} height={16}/></Link>
        </p>
      </footer>
    </>
  )
}

export default Footer