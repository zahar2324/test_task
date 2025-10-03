import Link from 'next/link'
import React from 'react'

const Registretion = () => {
  return (
    <div>
        <h1>Registration:</h1>
<div>
<Link href='/sign-in'>Go to Sign-in</Link>
</div>
    <div>
  <Link href='sign-up'>Go to Signup</Link>
    </div>
  
    </div>
  )
}

export default Registretion