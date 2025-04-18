"use client";

import * as React from "react"

interface NavProps {
  children: React.ReactNode;
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export const NavigationMenu = ({ children }: NavProps) => {
  return <nav>{children}</nav>
}

export const NavigationMenuList = ({ children }: NavProps) => {
  return <ul className="flex space-x-4">{children}</ul>
}

export const NavigationMenuItem = ({ children }: NavProps) => {
  return <li>{children}</li>
}

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`text-gray-600 hover:text-emerald-600 ${className || ""}`}
        {...props}
      >
        {children}
      </a>
    )
  }
)

NavigationMenuLink.displayName = "NavigationMenuLink"

export const NavigationMenuTrigger = ({ children }: NavProps) => {
  return <button>{children}</button>
}

export const NavigationMenuContent = ({ children }: NavProps) => {
  return <div>{children}</div>
} 