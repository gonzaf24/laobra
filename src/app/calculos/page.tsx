"use client";

import { useState } from "react";
import { Calculator, Box, Grid3X3, Layers, Trash2, Paintbrush, Database, Info } from "lucide-react";

export default function CalculosPage() {
  const [activeCalc, setActiveCalc] = useState<"mortero" | "mermas" | "pladur" | "escombros" | "pintura" | "hormigon">("mortero");

  return (
    <div className="px-6 py-8 pb-32">
      <section className="mb-8">
        <h2 className="text-3xl font-black mb-2 text-gradient">Cálculos de Obra</h2>
        <p className="text-text-muted">
          Herramientas rápidas para evitar desperdicio y falta de material.
        </p>
      </section>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
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
        <button 
          onClick={() => setActiveCalc("escombros")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "escombros" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Trash2 size={18} />
          Escombros
        </button>
        <button 
          onClick={() => setActiveCalc("pintura")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "pintura" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Paintbrush size={18} />
          Pintura
        </button>
        <button 
          onClick={() => setActiveCalc("hormigon")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCalc === "hormigon" ? "bg-primary text-slate-900 border-primary" : "bg-surface text-text-muted border-slate-700"}`}
        >
          <Database size={18} />
          Hormigón
        </button>
      </div>

      <div className="card-obra p-6 min-h-[400px]">
        {activeCalc === "mortero" && <CalculadoraMortero />}
        {activeCalc === "mermas" && <CalculadoraMermas />}
        {activeCalc === "pladur" && <CalculadoraPladur />}
        {activeCalc === "escombros" && <CalculadoraEscombros />}
        {activeCalc === "pintura" && <CalculadoraPintura />}
        {activeCalc === "hormigon" && <CalculadoraHormigon />}
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

function CalculadoraEscombros() {
  const [largo, setLargo] = useState("");
  const [alto, setAlto] = useState("");
  const [tipo, setTipo] = useState("10"); // Espesor tabique cm

  const volumen = Number(largo) * Number(alto) * (Number(tipo) / 100) * 1.3; // 1.3 es el coeficiente de esponjamiento
  const sacos = Math.ceil(volumen / 0.02); // Saco estándar de 20L (0.02m3)
  const bigBags = Math.ceil(volumen / 0.8); // Big bag aprox 0.8m3 reales

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trash2 className="text-primary" /> Volumen de Escombros
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Largo (m)</label>
            <input 
              type="number" 
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 5"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Alto (m)</label>
            <input 
              type="number" 
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 2.5"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Grosor Tabique</label>
          <select 
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
          >
            <option value="7">Tabique fino (7cm)</option>
            <option value="10">Tabique normal (10cm)</option>
            <option value="15">Muro medio (15cm)</option>
            <option value="25">Muro carga (25cm)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Big Bags (1m³)</p>
          <p className="text-2xl font-black text-white">{largo && alto ? bigBags : 0}</p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Sacos de Mano</p>
          <p className="text-2xl font-black text-white">{largo && alto ? sacos : 0}</p>
        </div>
      </div>

      <div className="flex gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
        <Info size={14} className="text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-text-muted leading-tight">
          Cálculo incluye coeficiente de <span className="text-white">esponjamiento (30%)</span>. El volumen del escombro suelto siempre es mayor que el del muro en pie.
        </p>
      </div>
    </div>
  );
}

function CalculadoraPintura() {
  const [m2, setM2] = useState("");
  const [manos, setManos] = useState("2");

  // Rendimiento medio 10m2/L por mano
  const totalLitros = (Number(m2) * Number(manos)) / 10;
  const botes15L = Math.ceil(totalLitros / 15);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Paintbrush className="text-primary" /> Rendimiento de Pintura
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Superficie a pintar (m²)</label>
            <input 
              type="number" 
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 80"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Nº de Manos</label>
            <div className="flex gap-4">
              {["1", "2", "3"].map((n) => (
                <button
                  key={n}
                  onClick={() => setManos(n)}
                  className={`flex-1 p-3 rounded-lg border transition-all ${manos === n ? "bg-primary/20 border-primary text-primary font-bold" : "bg-slate-900 border-slate-700 text-text-muted"}`}
                >
                  {n} {Number(n) === 1 ? "mano" : "manos"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
        <p className="text-sm text-text-muted mb-1">Necesitarás aproximadamente:</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black text-primary">
            {m2 ? totalLitros.toFixed(1) : 0} <span className="text-lg">Litros</span>
          </p>
          <p className="text-text-muted text-xs">
            (~{m2 ? botes15L : 0} botes de 15L)
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraHormigon() {
  const [ancho, setAncho] = useState("");
  const [largo, setLargo] = useState("");
  const [espesor, setEspesor] = useState("");

  const m3 = Number(ancho) * Number(largo) * (Number(espesor) / 100);
  const sacos = Math.ceil(m3 / 0.012); // Aprox 12L por saco de 25kg de hormigón seco

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database className="text-primary" /> Cubicación de Hormigón
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Ancho (m)</label>
            <input 
              type="number" 
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 2"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Largo (m)</label>
            <input 
              type="number" 
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
              placeholder="Ej: 4"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Espesor / Fondo (cm)</label>
          <input 
            type="number" 
            value={espesor}
            onChange={(e) => setEspesor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-primary"
            placeholder="Ej: 15"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Volumen Total</p>
          <p className="text-2xl font-black text-white">{ancho && largo && espesor ? m3.toFixed(2) : 0} <span className="text-sm">m³</span></p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Sacos de 25kg</p>
          <p className="text-2xl font-black text-white">{ancho && largo && espesor ? sacos : 0}</p>
        </div>
      </div>
    </div>
  );
}
