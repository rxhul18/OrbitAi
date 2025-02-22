import Link from "next/link"
import OrbitLogo from "./logo"
// import Squares from "./Squares"

export default function Footer() {
  return (
    <footer className="border border-dashed bg-background">
      <div className="mx-auto container px-4 py-12 md:px-6 lg:px-8 border border-dashed border-t-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo and tagline */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
            <OrbitLogo/>
            </div>
            <h2 className="mt-6 text-3xl font-serif text-primary/85">
              Remember everything,
              <br />
              always.
            </h2>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-600 hover:text-gray-900">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/demo" className="text-gray-600 hover:text-gray-900">
                  Book a demo
                </Link>
              </li>
              <li>
                <Link href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-900">
                  E-mail
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/mindpuzzledev" className="text-gray-600 hover:text-gray-900">
                  X (Twitter)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-start justify-between border-t pt-8 md:flex-row md:items-center">
          <p className="text-xs text-gray-500">©ORBIT.AI 2025</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-900">
              T&C
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-900">
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
      {/* <Squares /> */}
    </footer>
  )
}

