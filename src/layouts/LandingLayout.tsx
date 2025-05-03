import { Outlet } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="w-full px-4 py-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">InventoryPro</h1>
        {/* Theme toggle can go here if you have one */}
        <ModeToggle/>
      </header>

      <Outlet />

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        © {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </div>
  )
}
