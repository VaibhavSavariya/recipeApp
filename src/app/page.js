"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/page";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main>
        <Dashboard />
      </main>
    </>
  );
}
