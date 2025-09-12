import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 border-r min-h-[calc(100vh-56px-48px)] p-4 space-y-2 text-sm">
      <div className="font-semibold mb-2">Dashboards</div>
      <nav className="space-y-1">
        <Link href="/dashboard/producer" className="block px-2 py-1 rounded hover:bg-gray-50">Producer</Link>
        <Link href="/dashboard/recycler" className="block px-2 py-1 rounded hover:bg-gray-50">Recycler</Link>
        <Link href="/dashboard/corporate" className="block px-2 py-1 rounded hover:bg-gray-50">Corporate</Link>
      </nav>
    </aside>
  );
}


