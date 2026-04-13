import { useState } from "react";

// 🎨 Colores con nombre
const coloresBase = [
  { hex: "#000000", nombre: "Negro" },
  { hex: "#ffffff", nombre: "Blanco" },
  { hex: "#ff0000", nombre: "Rojo" },
  { hex: "#00ff00", nombre: "Verde" },
  { hex: "#0000ff", nombre: "Azul" },
  { hex: "#ffff00", nombre: "Amarillo" },
  { hex: "#ff8800", nombre: "Naranja" },
  { hex: "#8000ff", nombre: "Morado" },
  { hex: "#00ffff", nombre: "Cian" },
  { hex: "#888888", nombre: "Gris" },
];

const tipos = ["PLA", "PETG", "TPU", "PVA"];
const ubicaciones = ["CFS Creadora", "AMS Koala", "Bodega"];

export default function AddModal({ open, setOpen, agregar }) {
  const [form, setForm] = useState({
    tipo: "",
    color: "",
    nombreColor: "",
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
      nombre_color: form.nombreColor,
      cantidad: total,
      ubicacion: form.ubicacion,
    });

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-zinc-800 text-white p-6 rounded-2xl w-80 flex flex-col gap-4">

        <h2 className="font-bold text-lg">Nuevo Filamento</h2>

        {/* 🔥 Especial */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            onChange={(e) =>
              setForm({ ...form, especial: e.target.checked })
            }
          />
          Filamento especial
        </label>

        {form.especial ? (
          <input
            placeholder="Nombre especial"
            className="bg-zinc-700 p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, nombreEspecial: e.target.value })
            }
          />
        ) : (
          <select
            className="bg-zinc-700 p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, tipo: e.target.value })
            }
          >
            <option value="">Tipo</option>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        )}

        {/* 🎨 COLOR */}
        <div>
          <p className="text-sm text-gray-300">Color</p>

          <div className="flex gap-2 flex-wrap mt-2">
            {coloresBase.map((c) => (
              <div
                key={c.hex}
                onClick={() =>
                  setForm({
                    ...form,
                    color: c.hex,
                    nombreColor: c.nombre,
                  })
                }
                title={c.nombre}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                  form.color === c.hex
                    ? "border-white scale-110"
                    : "border-zinc-600"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}

            {/* 🎯 Color personalizado */}
            <input
              type="color"
              value={form.color || "#ffffff"}
              onChange={(e) =>
                setForm({
                  ...form,
                  color: e.target.value,
                  nombreColor: "Personalizado",
                })
              }
              className="w-8 h-8 rounded border border-zinc-600 bg-transparent cursor-pointer"
            />
          </div>

          {/* 🏷 Nombre del color */}
          <p className="text-xs mt-2 text-gray-400">
            {form.nombreColor || "Selecciona un color"}
          </p>

          {/* 🌈 Preview */}
          <div
            className="w-full h-4 rounded mt-2"
            style={{ backgroundColor: form.color }}
          />
        </div>

        {/* 📦 Spools */}
        <input
          type="number"
          placeholder="Spools"
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, spools: Number(e.target.value) })
          }
        />

        {/* ⚡ Gramos */}
        <input
          type="number"
          placeholder="Gramos extra"
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, gramos: Number(e.target.value) })
          }
        />

        {/* 📍 Ubicación */}
        <select
          className="bg-zinc-700 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, ubicacion: e.target.value })
          }
        >
          <option value="">Ubicación</option>
          {ubicaciones.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        {/* 🚀 Guardar */}
        <button
          onClick={handleSubmit}
          className="bg-white text-black py-2 rounded font-semibold active:scale-95"
        >
          Guardar
        </button>

      </div>
    </div>
  );
}