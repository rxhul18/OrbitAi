import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import OrbitLogo from './logo'

function Navbar() {
    return (
        <div className='border border-dashed sticky z-50 -top-1'>
            <header className=" bg-background backdrop-blur-sm">
                <nav className="container mx-auto px-4 h-16 flex items-center justify-between border border-dashed border-y-0">
                    <Link href="/" className="flex items-center gap-2">
                        <OrbitLogo/>
                    </Link>
                </nav>
            </header>
        </div>
    )
}

export function SignInNavbar() {
    return (
        <div className='border border-dashed border-l-0 sticky z-50 top-0'>
            <header className=" bg-background backdrop-blur-sm">
                <nav className="container mx-auto px-4 h-20 flex items-center justify-between border border-dashed border-y-0">
                    <div className='flex items-center gap-6'>
                        <SidebarTrigger variant={"outline"}/>
                        <Link href="/" className="flex items-center gap-2">
                        <OrbitLogo/>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="bg-[#6466f1] border border-[#484ac1] hover:bg-[#595ce6] text-white h-8 rounded-xl" asChild variant={"outline"}>
                            <Link href="/resources" className="flex items-center gap-2">
                                <Pencil className="w-4 h-4" /> Add Resources
                            </Link>
                        </Button>
                    </div>
                </nav>
            </header>
        </div>  
    )
}

export default Navbar