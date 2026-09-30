"use client";

import { useEffect, useState } from "react";

type HealthState =
  | { kind: "checking" }
  | { kind: "healthy"; message: string }
  | { kind: "unhealthy"; message: string };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function Home() {
  const [health, setHealth] = useState<HealthState>({ kind: "checking" });

  useEffect(() => {
    async function checkApiHealth() {
      try {
        const response = await fetch(`${apiUrl}/health`, { cache: "no-store" });
        const body = (await response.json()) as { status?: string; database?: string };

        if (!response.ok) {
          throw new Error(body.status ?? "API is unavailable");
        }

        setHealth({
          kind: "healthy",
          message: `API ${body.status ?? "healthy"}; database ${body.database ?? "connected"}.`,
        });
      } catch {
        setHealth({
          kind: "unhealthy",
          message: "API health check failed. Start PostgreSQL and the API, then refresh this page.",
        });
      }
    }

    void checkApiHealth();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8 text-slate-950">
      <section className="w-full max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium text-slate-500">SmartOps</p>
        <h1 className="mt-2 text-3xl font-semibold">Development environment</h1>
        <p className="mt-4 text-slate-600">Frontend-to-API health check</p>
        <p
          className={`mt-3 rounded-md px-4 py-3 text-sm ${
            health.kind === "healthy"
              ? "bg-emerald-50 text-emerald-800"
              : health.kind === "unhealthy"
                ? "bg-red-50 text-red-800"
                : "bg-slate-100 text-slate-700"
          }`}
        >
          {health.kind === "checking" ? "Checking API health…" : health.message}
        </p>
      </section>
    </main>
  );
}
