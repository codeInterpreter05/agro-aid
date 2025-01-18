"use client";

import { cn } from "@/lib/utils"
import { console } from "inspector"
import { Bot, Sprout, LayoutDashboard, ChartNoAxesColumn, MusicIcon, Settings, VideoIcon, SproutIcon,  } from "lucide-react"
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
        label: "Chatbot",
        icon: Bot,
        href: "/chatbot",
        color: "text-violet-500"
    },
    {
        label: "Crops",
        icon: Sprout,
        href: "/crops",
        color: "text-emerald-500"
    },
    {
        label: "Analysis",
        icon: ChartNoAxesColumn,
        href: "/analysis",
        color: "text-orange-700"
    },
    {
        label: "Cattles",
        icon: MusicIcon,
        href: "/cattles",
        color: "text-pink-700"
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
                    AgroAid
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