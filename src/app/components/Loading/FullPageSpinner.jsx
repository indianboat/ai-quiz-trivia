import React from 'react'

const FullPageSpinner = () => {
  return (
    <div className='w-full h-full flex items-center justify-center absolute inset-0 backdrop-blur-sm z-50'>
      <span className='spinner'></span>
    </div>
  )
}

export default FullPageSpinner