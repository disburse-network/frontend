"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CryptoImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallback?: string
}

export function CryptoImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallback = "/placeholder.svg"
}: CryptoImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-full", className)}
      onError={handleError}
      crossOrigin="anonymous"
    />
  )
} 