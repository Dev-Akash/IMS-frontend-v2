import { Bell, ChartPie, Home, LogOut, Nut, Package, Truck, UserCog, Users } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { Card } from "./ui/card"
import { ModeToggle } from "./mode-toggle"
import { isAuthenticated, signOut } from "@/api/auth"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: isAuthenticated()?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user",
        icon: Home,
        access: "user",
    },
    {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Package,
        access: "user",
    },
    {
        title: "Products",
        url: "/dashboard/products",
        icon: Nut,
        access: "user",
    },
    {
        title: "Stocks",
        url: "/dashboard/stocks",
        icon: Package,
        access: "user",
    },
    {
        title: "Suppliers",
        url: "/dashboard/suppliers",
        icon: UserCog,
        access: "user",
    },
    {
        title: "Warehouses",
        url: "/dashboard/warehouses",
        icon: Truck,
        access: "user"
    },
    {
        title: "Manage Users",
        url: "/dashboard/users",
        icon: Users,
        access: "admin"
    },
    {
        title: "Reports",
        url: "/dashboard/reports",
        icon: ChartPie,
        access: "admin"
    },
    {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
        access: "user"
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Card className="flex items-center justify-between p-4 cursor-pointer" onClick={() => window.location.href = "/"}>
                    <div className="flex items-center space-x-2">
                        <Package />
                        <span className="text-lg font-bold">InventoryPro</span>
                    </div>
                </Card>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Inventory Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                (item.access !== 'admin' || (item.access === 'admin' && isAuthenticated()?.user?.role === 1)) && (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="flex items-center justify-between">
                                <span>Toggle Theme</span>
                                <ModeToggle/>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#" onClick={() => {signOut(() => window.location.href = "/")}}>
                                <LogOut />
                                <span>Logout</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
