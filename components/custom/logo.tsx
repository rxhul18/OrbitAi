import Image from "next/image";
import React from "react";

interface LogoProps {
  size?: number;
}

export default function OrbitLogo({ size = 40 }: LogoProps) {
  return (
    <Image src={"/orbit-logo.png"} alt="logo" height={size} width={size} />
  );
}
