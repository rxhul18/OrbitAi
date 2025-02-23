"use client";
import React from "react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import OrbitLogo from "./logo";
import { AddResources } from "./add-resources";

function Navbar() {
  return (
    <div className="border border-dashed sticky z-50 -top-1">
      <header className=" bg-background backdrop-blur-sm">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between border border-dashed border-y-0">
          <Link href="/" className="flex items-center gap-2">
            <OrbitLogo />
          </Link>
        </nav>
      </header>
    </div>
  );
}

export function SignInNavbar() {
  // const {
  //     state,
  //   } = useSidebar()
  return (
    <div className="border border-dashed border-l-0 sticky z-50 top-0">
      <header className=" bg-background backdrop-blur-sm">
        <nav className="container mx-auto px-4 h-20 flex items-center justify-between border border-dashed border-y-0">
          <div className="flex items-center gap-6">
            <SidebarTrigger variant={"outline"} />

            {/* {state == "collapsed"}{
                            <Link href="/" className="flex items-center gap-2">
                            <OrbitLogo/>
                            </Link>
                        } */}
          </div>
          <div className="flex items-center gap-4">
            <AddResources />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
