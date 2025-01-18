"use client";

import { cn } from "@/lib/utils"
import { console } from "inspector"
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, Settings, VideoIcon } from "lucide-react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"]})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
           <div className="px-3 py-1 flex-1">
            <Link href="/dashboard" className="flex items-center mb-6 mt-6 sm:mt-0 sm:mb-14">
                <div className="relative w-12 h-12 mr-2">
                    <Image fill alt="logo" src="/logo.png" />
                </div>
                <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                    CreaFive
                </h1>
            </Link>
            <div className="space-y-1">
                {
                    routes.map((route) => (
                        <Link href={route.href} key={route.label} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transiton", 
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                        )}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("mr-3 h-6 w-6", route.color)} size={20} />
                                {route.label}
                            </div>
                        </Link>
                    ))
                }
            </div>
           </div>
        </div>
    )
}

export default Sidebar