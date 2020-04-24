import React from 'react'
import Link from 'next/link'
function Home() {
    return (
      <ul>
        <li>

            <a href="/">Home</a>
    
        </li>
        <li>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
      </ul>
    )
  }
  
  export default Home