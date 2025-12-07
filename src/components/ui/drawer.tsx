import { cn } from "@/lib/utils"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

type DrawerSide = "bottom" | "right" | "left"

const DrawerSideContext = React.createContext<DrawerSide>("bottom")

const Drawer = ({
  shouldScaleBackground = true,
  side = "bottom",
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & { side?: DrawerSide }) => (
  <DrawerSideContext.Provider value={side}>
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props}>
      {children}
    </DrawerPrimitive.Root>
  </DrawerSideContext.Provider>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & { side?: DrawerSide }
>(({ className, children, side, ...props }, ref) => {
  const ctxSide = React.useContext(DrawerSideContext)
  const effectiveSide = side ?? ctxSide ?? "bottom"

  const baseClass =
    effectiveSide === "bottom"
      ? "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background"
      : effectiveSide === "right"
      ? "fixed inset-y-0 right-0 z-50 h-[100dvh] w-96 flex flex-col border bg-background"
      : /* left */ "fixed inset-y-0 left-0 z-50 h-[100dvh] w-96 flex flex-col border bg-background"

  // Transition classes: use data-state attributes provided by the primitive
  const transitionClass =
    effectiveSide === "bottom"
      ? "transform transition-transform duration-300 data-[state=open]:!translate-y-0 data-[state=closed]:!translate-y-full"
      : effectiveSide === "right"
      ? "transform transition-transform duration-300 data-[state=open]:!translate-x-0 data-[state=closed]:!translate-x-full"
      : /* left */ "transform transition-transform duration-300 data-[state=open]:!translate-x-0 data-[state=closed]:!-translate-x-full"

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content ref={ref} className={cn(baseClass, transitionClass, className)} {...props}>
        {effectiveSide === "bottom" ? <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" /> : null}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
