import Image from "next/image";

interface EmptyProps {
    label: string;
    src: string; // Accepting src as a prop
}

export const Empty = ({
    label,
    src, // Destructure src from props
}: EmptyProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center sm:mt-10 ">
            <div className="relative h-48 w-48">
                <Image 
                    alt="Empty"
                    fill
                    src={src} // Use the passed src prop
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    );
};
