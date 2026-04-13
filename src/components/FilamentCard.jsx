import { useState } from "react";

export default function FilamentCard({ f, actualizar, eliminar }) {
  if (!f) return null;

  const [edit, setEdit] = useState(false);

  const cantidad = f.cantidad || 0;
  const color = f.color || "#888";

  const spools = Math.floor(cantidad / 1000);
  const restante = cantidad % 1000;
  const porcentaje = (restante / 1000) * 100;

  const [form, setForm] = useState({
    spools,
    gramos: restante,
    ubicacion: f.ubicacion || "Bodega",
  });

  const guardar = () => {
    const total = (form.spools * 1000) + form.gramos;

    actualizar(f.id, total, form.ubicacion);
    setEdit(false);
  };

  return (
    <div className="bg-zinc-800 rounded-2xl shadow p-4 flex flex-col gap-3 
      transition hover:scale-105">

      {/* Header */}
      <div className="flex justify-between">
        <h2 className="font-semibold">{f.tipo || "Filamento"}</h2>
        <span className="text-xs text-gray-400">{f.ubicacion || "Sin ubicación"}</span>
      </div>

      {/* Color */}
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-gray-300">{color}</span>
      </div>

      {/* Barra */}
      <div className="relative">
        <div className="w-full bg-zinc-700 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 transition-all"
            style={{
              width: `${Math.min(porcentaje, 100)}%`,
              backgroundColor: color
            }}
          />
        </div>

        <span className="absolute right-0 -top-5 text-xs font-bold">
          {Math.round(porcentaje)}%
        </span>
      </div>

      {/* 🧵 Spools */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <span>🧵</span>
        <span>{spools}</span>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-400">
        + {restante}g
      </div>

      {/* ✏️ Editar */}
      {edit && (
        <div className="flex flex-col gap-2">
          <input
            type="number"
            className="bg-zinc-700 p-1 rounded"
            value={form.spools}
            onChange={(e) =>
              setForm({ ...form, spools: Number(e.target.value) })
            }
          />

          <input
            type="number"
            className="bg-zinc-700 p-1 rounded"
            value={form.gramos}
            onChange={(e) =>
              setForm({ ...form, gramos: Number(e.target.value) })
            }
          />

          <select
            className="bg-zinc-700 p-1 rounded"
            value={form.ubicacion}
            onChange={(e) =>
              setForm({ ...form, ubicacion: e.target.value })
            }
          >
            <option>CFS Creadora</option>
            <option>AMS Koala</option>
            <option>Bodega</option>
          </select>

          <button
            onClick={guardar}
            className="bg-green-500 py-1 rounded"
          >
            Guardar
          </button>
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-2">
        <button
          onClick={() => setEdit(!edit)}
          className="bg-blue-500 px-2 py-1 rounded"
        >
          Editar
        </button>

        <button
          onClick={() => eliminar(f.id)}
          className="bg-red-500 px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}