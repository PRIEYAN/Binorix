'use client'

import { Button } from "@/components/ui/button"
import { Home, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Sidebar() {
    const router = useRouter()

    const navItems = [
        { icon: <Home className="w-6 h-6" />, label: "Home", route: "" },
        { icon: <Settings className="w-6 h-6" />, label: "Settings", route: "/settings" },
        { icon: <LogOut className="w-6 h-6" />, label: "Logout", route: "/logout" },
    ]

    return (
        <div className="h-screen w-[80px] bg-purple-100 dark:bg-purple-900 p-4 flex flex-col justify-between items-center shadow-lg">
            <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(item.route)}
                        className="text-purple-600 hover:bg-purple-200 dark:text-white dark:hover:bg-purple-700"
                    >
                        {item.icon}
                    </Button>
                ))}
            </div>

            <div className="mb-4">
                <span className="text-xs text-gray-400">v1.0</span>
            </div>
        </div>
    )
}