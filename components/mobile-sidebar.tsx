"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const [isMounted, setisMounted] = useState(false);
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setisMounted(true);
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      <div>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="p-0 border-none outline-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
