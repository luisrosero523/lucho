import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import FilamentCard from "./components/FilamentCard";
import AddModal from "./components/AddModal";

export default function App() {
  const [filamentos, setFilamentos] = useState([]);
  const [open, setOpen] = useState(false);

  // 🔄 Obtener datos
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("filamentos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setFilamentos(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Agregar
  const agregar = async (nuevo) => {
    await supabase.from("filamentos").insert([nuevo]);
    fetchData();
  };

  // ✏️ Actualizar
  const actualizar = async (id, cantidad, ubicacion) => {
    await supabase
      .from("filamentos")
      .update({ cantidad, ubicacion })
      .eq("id", id);

    fetchData();
  };

  // 🗑 Eliminar
  const eliminar = async (id) => {
    await supabase.from("filamentos").delete().eq("id", id);
    fetchData();
  };

  // 🔥 AGRUPAR POR TIPO
  const agrupados = filamentos.reduce((acc, f) => {
    const tipo = f.tipo || "Otros";
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(f);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-zinc-900 text-white">

      {/* Navbar */}
      <div className="sticky top-0 bg-zinc-800 border-b border-zinc-700 p-4 flex justify-between">
        <h1 className="font-bold text-lg">Filamento</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-3 py-1 rounded-lg"
        >
          + Añadir
        </button>
      </div>

      {/* 🔥 Secciones por tipo */}
      <div className="p-4 flex flex-col gap-8">

        {Object.entries(agrupados).map(([tipo, items]) => (
          <div key={tipo}>

            {/* Título */}
            <h2 className="text-xl font-bold mb-3">
              {tipo} ({items.length})
            </h2>

            {/* Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((f) => (
                <FilamentCard
                  key={f.id}
                  f={f}
                  actualizar={actualizar}
                  eliminar={eliminar}
                />
              ))}
            </div>

          </div>
        ))}

      </div>

      {/* Modal */}
      <AddModal open={open} setOpen={setOpen} agregar={agregar} />
    </div>
  );
}