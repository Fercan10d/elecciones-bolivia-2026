"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="bg-[var(--color-elpost-secondary)] text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-bold text-lg">
            EL POST — Admin
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-300 hover:text-white"
            target="_blank"
          >
            Ver página pública
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
