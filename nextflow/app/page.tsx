import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Canvas Builder 🚀
      </h1>

      <Link
        href="/builder"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Open Builder
      </Link>
    </div>
  );
}