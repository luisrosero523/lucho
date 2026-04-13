import { useState } from "react";

const coloresBase = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff8800", "#8000ff",
  "#00ffff", "#888888"
];

const tipos = ["PLA", "PETG", "TPU", "PVA"];

const ubicaciones = [
  "CFS Creadora",
  "AMS Koala",
  "Bodega"
];

export default function AddModal({ open, setOpen, agregar }) {
  const [form, setForm] = useState({
    tipo: "",
    color: "",
    spools: 0,
    gramos: 0,
    ubicacion: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    const total = (form.spools * 1000) + form.gramos;

    agregar({
      tipo: form.tipo,
      color: form.color,
      cantidad: total,
      ubicacion: form.ubicacion,
    });

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl w-80 flex flex-col gap-3">

        <h2 className="font-bold">Nuevo Filamento</h2>

        {/* Tipo */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="">Tipo</option>
          {tipos.map(t => <option key={t}>{t}</option>)}
        </select>

        {/* Color */}
        <div>
          <p className="text-sm">Color</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {coloresBase.map((c) => (
              <div
                key={c}
                onClick={() => setForm({ ...form, color: c })}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  form.color === c ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              className="w-8 h-8"
              onChange={(e) =>
                setForm({ ...form, color: e.target.value })
              }
            />
          </div>
        </div>

        {/* Spools */}
        <input
          type="number"
          placeholder="Spools"
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, spools: Number(e.target.value) })
          }
        />

        {/* Gramos */}
        <input
          type="number"
          placeholder="Gramos extra"
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, gramos: Number(e.target.value) })
          }
        />

        {/* Ubicación */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
        >
          <option value="">Ubicación</option>
          {ubicaciones.map(u => <option key={u}>{u}</option>)}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-black text-white py-2 rounded active:scale-95"
        >
          Guardar
        </button>

      </div>
    </div>
  );
}