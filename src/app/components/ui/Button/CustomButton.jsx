import React from 'react'

const CustomButton = ({ buttonName = "Button", className = "", ...rest }) => {
  return (
    <>
      <button className={`custom-button w-full select-none ${className}`} {...rest}>
        {buttonName}
      </button>
    </>
  )
}

export default CustomButton