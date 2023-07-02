import React from 'react'

function Heading({children}: {children: string}) {
  return (
    <div className='text-2xl font-medium'>
        {children}
    </div>
  )
}

export default Heading