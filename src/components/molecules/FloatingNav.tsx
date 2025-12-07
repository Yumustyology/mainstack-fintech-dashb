"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { LinkIcon, ProductsIcon, FolderIcon, DocumentIcon } from "../atoms/icons"

type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>

const navItems: { label: string; Icon: IconComponent; aria: string }[] = [
  { label: "Link", Icon: LinkIcon, aria: "Link" },
  { label: "Products", Icon: ProductsIcon, aria: "Products" },
  { label: "Folder", Icon: FolderIcon, aria: "Folder" },
  { label: "Docs", Icon: DocumentIcon, aria: "Docs" },
]

const FloatingNav: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null)
  const selectingRef = useRef(false)

  useEffect(() => {
    const onPointerDown = () => {
      selectingRef.current = true
    }
    const onPointerUp = () => {
      selectingRef.current = false
      setHovered(null)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!selectingRef.current) return
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return
      const btn = el.closest('[data-fnav-item]') as HTMLElement | null
      const label = btn?.getAttribute('data-fnav-item') ?? null
      setHovered(label)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointermove', onPointerMove)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <nav
        aria-label="Floating navigation"
        className="flex flex-col items-center gap-2 w-10 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-100"
      >
        {navItems.map(({ label, Icon, aria }) => {
          const isActive = hovered === label
          return (
            <Button
              key={label}
              variant="ghost"
              data-fnav-item={label}
              className="w-8 h-8 p-0 rounded-full"
              aria-label={aria}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => !selectingRef.current && setHovered(null)}
              onFocus={() => setHovered(label)}
              onBlur={() => setHovered(null)}
            >
              <Icon
                size={24}
                className={`filter ${isActive ? 'grayscale-0' : 'grayscale'} transition-all`}
              />
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

export default FloatingNav
