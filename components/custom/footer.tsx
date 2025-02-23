import Link from "next/link"
import OrbitLogo from "./logo"
// import Squares from "./Squares"

export default function Footer() {
  return (
    <footer className="border border-dashed bg-background">
      <div className="mx-auto container px-4 py-12 md:px-6 lg:px-8 border border-dashed border-t-0">
        <div className="grid grid-cols-1 gap-8">
          {/* Logo and tagline */}
          <div className="">
            <div className="flex items-center gap-2">
            <OrbitLogo/>
            </div>
            <h2 className="mt-6 text-5xl font-serif text-primary/85">
              Remember everything, always.
            </h2>
            <h2 className="text-3xl mt-2 text-primary/70">
              Build with 🫶🏻 <Link href={"https://x.com/SaidevDhal"} className="hover:underline text-muted hover:text-primary/70 duration-300 ease-in-out">Saidev Dhal</Link> & <Link href={"https://x.com/mindpuzzledev"} className="hover:underline text-muted hover:text-primary/70 duration-300 ease-in-out">Rahul Shah</Link>
            </h2>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-start justify-between border-t pt-8 md:flex-row md:items-center">
          <p className="text-xs text-gray-500">©ORBIT.AI 2025</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="https://github.com/rxhul18/OrbitAi" className="text-xs text-gray-500 hover:text-gray-900">
              GITHUB
            </Link>
          </div>
        </div>
      </div>
      {/* <Squares /> */}
    </footer>
  )
}

