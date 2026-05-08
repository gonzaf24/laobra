"use client";

import { useState } from "react";
import { Calculator, Box, Grid3X3, Layers } from "lucide-react";

export default function CalculosPage() {
  const [activeCalc, setActiveCalc] = useState<"mortero" | "mermas" | "pladur">("mortero");

  return (
    <div className="px-6 py-8">
      <section className="mb-8">
        <h2 className="text-3xl font-black mb-2 text-gradient">Cálculos de Obra</h2>
        <p className="text-text-muted">
          Herramientas rápidas para evitar desperdicio y falta de material.
        </p>
      </section>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveCalc("mortero")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "mortero" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Box size={18} />
          Mortero
        </button>
        <button 
          onClick={() => setActiveCalc("mermas")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "mermas" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Grid3X3 size={18} />
          Azulejos
        </button>
        <button 
          onClick={() => setActiveCalc("pladur")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "pladur" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Layers size={18} />
          Pladur
        </button>
      </div>

      <div className="card-obra p-6 min-h-[400px]">
        {activeCalc === "mortero" && <CalculadoraMortero />}
        {activeCalc === "mermas" && <CalculadoraMermas />}
        {activeCalc === "pladur" && <CalculadoraPladur />}
      </div>
    </div>
  );
}

function CalculadoraMortero() {
  const [m2, setM2] = useState("");
  const [espesor, setEspesor] = useState("");
  
  const totalLitros = Number(m2) * (Number(espesor) / 100) * 1000;
  const sacos = Math.ceil(totalLitros / 15); // Aprox 15L por saco de 25kg mezclado

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Box className="text-primary" /> Mortero Autonivelante
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Superficie (m²)</label>
            <input 
              type="number" 
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 20"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Espesor medio (cm)</label>
            <input 
              type="number" 
              value={espesor}
              onChange={(e) => setEspesor(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 3"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
        <p className="text-sm text-text-muted mb-1">Necesitarás aproximadamente:</p>
        <p className="text-3xl font-black text-primary">
          {m2 && espesor ? sacos : 0} <span className="text-lg">sacos</span>
        </p>
        <p className="text-xs text-text-muted mt-2 italic">
          * Basado en sacos de 25kg estándar.
        </p>
      </div>
    </div>
  );
}

function CalculadoraMermas() {
  const [m2, setM2] = useState("");
  const [merma, setMerma] = useState("10");

  const total = Number(m2) * (1 + Number(merma) / 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Grid3X3 className="text-primary" /> Azulejos y Pavimentos
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Superficie real (m²)</label>
            <input 
              type="number" 
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 15.5"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">% Desperdicio (Mermas)</label>
            <select 
              value={merma}
              onChange={(e) => setMerma(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
            >
              <option value="5">5% (Corte recto)</option>
              <option value="10">10% (Estándar)</option>
              <option value="15">15% (Trabado / Espiga)</option>
              <option value="20">20% (Mucho corte)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
        <p className="text-sm text-text-muted mb-1">Compra total recomendada:</p>
        <p className="text-3xl font-black text-primary">
          {m2 ? total.toFixed(2) : 0} <span className="text-lg">m²</span>
        </p>
      </div>
    </div>
  );
}

function CalculadoraPladur() {
  const [m2, setM2] = useState("");

  const placas = Math.ceil(Number(m2) / 2.88); // Placa estándar 1.2 x 2.4 = 2.88m2
  const perfiles = Math.ceil(Number(m2) * 1.5); // Aprox 1.5m de perfil por m2 de tabique

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Layers className="text-primary" /> Tabiquería Seca (Pladur)
        </h3>
        <div>
          <label className="block text-sm text-text-muted mb-1">Superficie de tabique (m²)</label>
          <input 
            type="number" 
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
            placeholder="Ej: 10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Placas (2.4x1.2)</p>
          <p className="text-2xl font-black text-white">{m2 ? placas : 0}</p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Perfiles (m.l.)</p>
          <p className="text-2xl font-black text-white">{m2 ? perfiles : 0}</p>
        </div>
      </div>
      
      <p className="text-[10px] text-text-muted italic text-center">
        * Cálculos aproximados para tabique estándar a una cara.
      </p>
    </div>
  );
}
