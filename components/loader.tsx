import Image from "next/image";

interface EmptyProps {
  label: string;
  src: string;
}

export const Loader = ({ label, src }: EmptyProps) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
