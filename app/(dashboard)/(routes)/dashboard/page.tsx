"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  VideoIcon,
  Sprout,
  Bot,
  ChartNoAxesColumn,
  Cat
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Chatbot",
    icon: Bot,
    href: "/chatbot",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Crops",
    icon: Sprout,
    href: "/crops",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Analysis",
    icon: ChartNoAxesColumn,
    href: "/analysis",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Cattles",
    icon: Cat,
    href: "/cattles",
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">AgroAid</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Empowering Smarter Farming and Animal Care with AI Precision
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => {
              router.push(tool.href);
            }}
            className="px-4 py-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon
                  className={cn("w-6 md:w-7 h-6 md:h-7", tool.color)}
                />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>

            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
