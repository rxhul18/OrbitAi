import React from 'react'
import { Meteors } from '../magicui/meteors'
import SignInBtn from './sign-btn'
import { Globe } from '../magicui/globe'

export default function Hero() {
    return (
        <section className="relative border border-dashed border-y-0 container items-center h-[80vh] mx-auto px-4 text-center py-16 md:py-20 md:pb-16">
            <Meteors number={22} />
            <h1 className="text-4xl md:text-5xl font-serif mb-3 text-primary/80 font-extralight tracking-tight">Your personal knowledge vault.</h1>
            <p className="text-xl text-gray-600 mb-10">
                Effortlessly store, recall, and connect all your knowledge with Brain
            </p>
            <SignInBtn />
            <div className="pt-5 pb-5">
                <div className="flex h-[40px] md:h-[100px] w-full flex-col items-center justify-center overflow-hidden">
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                        Orbit Ai
                    </span>
                </div>
            </div>
            <Globe className="top-[28rem] md:top-[22.5rem] overflow-hidden" />
        </section>
    )
}
