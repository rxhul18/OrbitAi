import Image from 'next/image'
import React from 'react'

export default function OrbitLogo() {
  return (
    <Image src={'/orbit-logo.png'} alt='logo' height={40} width={40}/>
  )
}
