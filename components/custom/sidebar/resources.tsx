import { Button } from '@/components/ui/button'
import { PackageOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Resources() {
  return (
    <Link href={"/resources"}>
        <Button variant={"secondary"} className='w-full mt-2 text-start h-8'><PackageOpen className='!size-5'/>My Resources</Button>
    </Link>
  )
}
