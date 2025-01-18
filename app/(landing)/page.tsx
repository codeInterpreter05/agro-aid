"use client";

import { useRouter } from "next/navigation";

const LandingPage = () => {
    const router = useRouter();
    router.push("/sign-in");
    return null;
};

export default LandingPage;

