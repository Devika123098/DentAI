import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-bold tracking-tight ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-95"
    
    const variants = {
      default: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-95 shadow-[var(--glow-shadow)]",
      destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[var(--color-destructive)]/90",
      outline: "border border-[color:var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]",
      secondary: "bg-[var(--color-brand-dark)] text-[var(--color-on-dark)] hover:bg-[var(--color-brand)] shadow-[var(--soft-shadow)]",
      ghost: "hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]",
      link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-11 px-5 py-3",
      sm: "h-9 px-4 text-xs",
      lg: "h-12 px-6 text-sm",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(baseClass, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

