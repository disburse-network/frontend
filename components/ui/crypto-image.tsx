"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
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

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

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