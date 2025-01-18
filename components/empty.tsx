import Image from "next/image";

interface EmptyProps {
    label: string;
}

export const Empty = ({
    label
} : EmptyProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center sm:mt-10 ">
           <div className="relative h-48 w-48">
             <Image 
             alt="Empty"
             fill
             src="/empty.png"
             />
           </div>
           <p className="text-muted-foreground text-sm text-center">
            {label}
           </p>
        </div>
    )
}