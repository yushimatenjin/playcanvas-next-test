import React from 'react'
import Link from 'next/link'
const Header  = () =>{
    return <div><h1>
        オービットカメラ　検証
    </h1>
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
    </div>
}

export default Header