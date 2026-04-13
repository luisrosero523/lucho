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
    <div
      className="rounded-2xl p-4 flex flex-col gap-3 text-black shadow-lg transition hover:scale-105"
      style={{ backgroundColor: color }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="bg-black/40 p-3 rounded-xl flex flex-col gap-3 text-white">

        {/* Header */}
        <div className="flex justify-between">
          <h2 className="font-semibold">{f.tipo || "Filamento"}</h2>
          <span className="text-xs">{f.ubicacion}</span>
        </div>

        {/* Barra */}
        <div className="relative">
          <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 transition-all"
              style={{
                width: `${Math.min(porcentaje, 100)}%`,
                backgroundColor: "#fff"
              }}
            />
          </div>

          <span className="absolute right-0 -top-5 text-xs font-bold">
            {Math.round(porcentaje)}%
          </span>
        </div>

        {/* Spools grande */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>🧵</span>
          <span>{spools}</span>
        </div>

        <div className="text-sm">+ {restante}g</div>

        {/* Edit */}
        {edit && (
          <div className="flex flex-col gap-2">
            <input
              type="number"
              className="bg-black/50 p-1 rounded text-white"
              value={form.spools}
              onChange={(e) =>
                setForm({ ...form, spools: Number(e.target.value) })
              }
            />

            <input
              type="number"
              className="bg-black/50 p-1 rounded text-white"
              value={form.gramos}
              onChange={(e) =>
                setForm({ ...form, gramos: Number(e.target.value) })
              }
            />

            <select
              className="bg-black/50 p-1 rounded text-white"
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
            className="bg-white text-black px-2 py-1 rounded"
          >
            Editar
          </button>

          <button
            onClick={() => eliminar(f.id)}
            className="bg-red-500 px-2 py-1 rounded text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}