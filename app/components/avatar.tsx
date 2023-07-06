"use client"

import Image from "next/image"

interface AvatarProps {
  src?: string | null
  alt?: string
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt={alt || "Avatar"}
      src={src || "/images/placeholder.jpg"}
    />
  )
}
