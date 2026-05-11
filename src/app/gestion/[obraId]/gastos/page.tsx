"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Camera,
  Trash2,
  FileText,
  Calendar,
  Euro,
  Image as ImageIcon,
  ChevronRight,
  X,
  Upload,
  Info
} from "lucide-react";
import { getObra, saveObra } from "@/lib/arquitecto-store";
import type { Obra, GastoObra } from "@/lib/arquitecto-types";

export default function GastosPage() {
  const params = useParams();
  const router = useRouter();
  const [obra, setObra] = useState<Obra | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Form State
  const [concepto, setConcepto] = useState("");
  const [importe, setImporte] = useState("");
  const [categoria, setCategoria] = useState<GastoObra["categoria"]>("materiales");
  const [proveedor, setProveedor] = useState("");
  const [notas, setNotas] = useState("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGasto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concepto || !importe) return;

    const nuevoGasto: GastoObra = {
      id: crypto.randomUUID(),
      concepto,
      importe: parseFloat(importe),
      categoria,
      proveedor,
      notas,
      fecha: new Date().toISOString(),
      fotoUrl: previewUrl || undefined,
    };

    const updatedObra = {
      ...obra,
      gastos: [nuevoGasto, ...(obra.gastos || [])],
    };

    saveObra(updatedObra);
    setObra(updatedObra);
    
    // Reset Form
    setConcepto("");
    setImporte("");
    setCategoria("materiales");
    setProveedor("");
    setNotas("");
    setPreviewUrl(null);
    setShowModal(false);
  };

  const eliminarGasto = (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este ticket?")) return;
    const updatedObra = {
      ...obra,
      gastos: obra.gastos.filter((g) => g.id !== id),
    };
    saveObra(updatedObra);
    setObra(updatedObra);
  };

  const total = obra.gastos?.reduce((acc, g) => acc + g.importe, 0) || 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      {/* Cabecera */}
      <div className="mb-8">
        <Link
          href={`/gestion/${obra.id}`}
          className="mb-4 flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Volver al Dashboard
        </Link>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-amber-500">
              <Euro size={16} />
              <span className="text-[10px] font-black tracking-widest uppercase italic">Control de Compras</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
              Registro de <span className="text-amber-500">Gastos</span>
            </h1>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-3 text-right">
            <p className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest">Total Acumulado</p>
            <p className="text-2xl font-black text-amber-500">
              {total.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
            </p>
          </div>
        </div>
      </div>

      {/* Botón Flotante / Acceso Rápido */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-500 py-5 text-sm font-black tracking-widest text-slate-900 uppercase shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:scale-[1.01] active:scale-95"
      >
        <Camera size={20} strokeWidth={3} /> Subir Ticket de Compra
      </button>

      {/* Listado de Gastos */}
      <div className="space-y-6">
        {obra.gastos?.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-slate-700">
              <FileText size={32} />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No hay gastos registrados</p>
            <p className="mt-1 text-xs text-slate-600">Fotografía tus tickets de Obramat para llevar el control.</p>
          </div>
        ) : (
          obra.gastos.map((gasto) => (
            <div
              key={gasto.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-amber-500/30"
            >
              <div className="flex items-center gap-4">
                {/* Miniatura de la Foto */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                  {gasto.fotoUrl ? (
                    <img src={gasto.fotoUrl} alt={gasto.concepto} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-800">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                      gasto.categoria === "materiales" ? "bg-blue-500/10 text-blue-400" :
                      gasto.categoria === "mano-de-obra" ? "bg-violet-500/10 text-violet-400" :
                      "bg-slate-800 text-slate-400"
                    }`}>
                      {gasto.categoria}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {new Date(gasto.fecha).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <h3 className="truncate text-sm font-black text-white uppercase italic">{gasto.concepto}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    Proveedor: {gasto.proveedor || "No especificado"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-white">
                    {gasto.importe.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                  </p>
                  <button
                    onClick={() => eliminarGasto(gasto.id)}
                    className="mt-1 text-slate-600 transition-colors hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Notas de Gasto */}
              {gasto.notas && (
                <div className="mt-4 flex gap-2 rounded-xl bg-slate-950/50 p-3 border border-slate-800/50">
                  <Info size={14} className="shrink-0 text-amber-500/50" />
                  <p className="text-[10px] leading-relaxed text-slate-400 italic">
                    {gasto.notas}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal de Registro */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-amber-500/20 bg-slate-900 p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white uppercase italic tracking-tight">Registrar Nueva Compra</h2>
              <button onClick={() => setShowModal(false)} className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddGasto} className="space-y-6">
              {/* Captura de Imagen */}
              <div className="relative">
                <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase tracking-widest">Ticket / Factura (Imprescindible)</label>
                <div className="flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950 transition-all hover:border-amber-500/30">
                  {previewUrl ? (
                    <div className="relative h-full w-full">
                      <img src={previewUrl} className="h-full w-full object-contain" alt="Preview" />
                      <button 
                        type="button"
                        onClick={() => setPreviewUrl(null)}
                        className="absolute right-3 top-3 rounded-full bg-red-500 p-1.5 text-white shadow-xl"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3">
                      <div className="rounded-full bg-amber-500/10 p-4 text-amber-500">
                        <Camera size={32} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-white uppercase">Hacer Foto o Subir</p>
                        <p className="text-[10px] text-slate-500 uppercase mt-1 italic">Toca para abrir la cámara</p>
                      </div>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Concepto de Gasto *</label>
                  <input 
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    placeholder="Ej: Pintura Plástica Blanca" 
                    required 
                    className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Importe Total (€) *</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={importe}
                    onChange={(e) => setImporte(e.target.value)}
                    placeholder="0.00" 
                    required 
                    className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-amber-500 font-black outline-none focus:border-amber-500/50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Proveedor</label>
                  <input 
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    placeholder="Ej: Obramat, Sika..." 
                    className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Categoría</label>
                  <select 
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as GastoObra["categoria"])}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                  >
                    <option value="materiales">Materiales</option>
                    <option value="mano-de-obra">Mano de Obra</option>
                    <option value="servicios">Servicios / Tasas</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
              </div>

              {/* Campo de Notas Libres */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Observaciones / Detalle de compra</label>
                <textarea 
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3} 
                  placeholder="Ej: Incluye 5 sacos de mortero, 2 rodillos y cinta de carrocero..." 
                  className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-white outline-none focus:border-amber-500/50 resize-none italic" 
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button type="submit" className="flex-1 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black text-slate-900 transition-all hover:bg-amber-400 active:scale-95 shadow-xl shadow-amber-500/10 uppercase tracking-widest">
                  Guardar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
