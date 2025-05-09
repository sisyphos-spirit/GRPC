
interface Receta {
  id: string
  titulo: string
  descripcion: string
  imagen_url: string
  pasos: string[],
  ingredientes: { nombre: string; cantidad: number; unidad: string }[]
}

export type RootStackParamList = {
    ListaRecetas: undefined;
    CrearReceta: { receta?: any } | undefined; // acepta parámetro opcional si también sirve para editar
    EditarReceta: { receta: any };
    InfoReceta: { receta: Receta };
    // Agrega aquí las demás rutas
  };