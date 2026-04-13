import { useState } from "react";

const coloresBase = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff8800", "#8000ff",
  "#00ffff", "#888888"
];

const tipos = ["PLA", "PETG", "TPU", "PVA"];
const ubicaciones = ["CFS Creadora", "AMS Koala", "Bodega"];

export default function AddModal({ open, setOpen, agregar }) {
  const [form, setForm] = useState({
    tipo: "",
    color: "",
    spools: 0,
    gramos: 0,
    ubicacion: "",
    especial: false,
    nombreEspecial: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    const total = (form.spools * 1000) + form.gramos;

    agregar({
      tipo: form.especial ? form.nombreEspecial : form.tipo,
      color: form.color,
      cantidad: total,
      ubicacion: form.ubicacion,
    });

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-zinc-800 text-white p-6 rounded-2xl w-80 flex flex-col gap-4">

        <h2 className="font-bold">Nuevo Filamento</h2>

        {/* Checkbox especial */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) =>
              setForm({ ...form, especial: e.target.checked })
            }
          />
          Filamento especial
        </label>

        {/* Si es especial */}
        {form.especial && (
          <input
            placeholder="Nombre especial"
            className="bg-zinc-700 p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, nombreEspecial: e.target.value })
            }
          />
        )}

        {/* Si NO es especial */}
        {!form.especial && (
          <select
            className="bg-zinc-700 p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, tipo: e.target.value })
            }
          >
            <option>Tipo</option>
            {tipos.map(t => <option key={t}>{t}</option>)}
          </select>
        )}

        {/* Color */}
        <div className="flex gap-2 flex-wrap">
          {coloresBase.map((c) => (
            <div
              key={c}
              onClick={() => setForm({ ...form, color: c })}
              className="w-8 h-8 rounded-full border cursor-pointer"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <input
          type="number"
          placeholder="Spools"
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, spools: Number(e.target.value) })
          }
        />

        <input
          type="number"
          placeholder="Gramos"
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, gramos: Number(e.target.value) })
          }
        />

        <select
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, ubicacion: e.target.value })
          }
        >
          {ubicaciones.map(u => <option key={u}>{u}</option>)}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-white text-black py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}