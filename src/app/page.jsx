// This is the root page - middleware handles redirects
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter(); 

  useEffect(() => {
    router.push(`/en`)
  }, [router]);

  return null
}
