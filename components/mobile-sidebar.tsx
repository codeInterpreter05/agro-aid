"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
      setisMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <div>
                <SheetTrigger asChild>
                    <Button variant='ghost' size='icon' className="md:hidden">
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
