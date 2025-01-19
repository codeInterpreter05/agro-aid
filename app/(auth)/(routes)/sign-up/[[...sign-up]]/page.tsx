import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: 'max-h-9vh', // Add custom styling for the root box
        },
      }}
    />
  );
}
