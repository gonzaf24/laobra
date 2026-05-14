"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { getObra } from "@/lib/arquitecto-store";
import type { Obra } from "@/lib/arquitecto-types";
import { ConfiguradorMaestro } from "../../_components/ConfiguradorMaestro";

export default function GenesisTecnicaPage() {
  const params = useParams();
  const router = useRouter();
  const [obra, setObra] = useState<Obra | null>(null);

  useEffect(() => {
    if (params.obraId) {
      const data = getObra(params.obraId as string);
      if (data) {
        setObra(data);
      } else {
        router.push("/gestion");
      }
    }
  }, [params.obraId, router]);

  if (!obra) return null;

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href={`/gestion/${obra.id}`}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Volver al Dashboard de la Obra
          </Link>
          <div className="flex items-center gap-4 pt-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-inner">
              <Construction size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                Génesis Técnica
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
                Motor Maestro de Cuantificación Global
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[40px] border border-slate-800 bg-slate-950/20 p-2">
        <ConfiguradorMaestro obraId={obra.id} />
      </div>
    </div>
  );
}
