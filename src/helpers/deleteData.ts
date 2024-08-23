import axios from "axios";
import { toast } from "sonner";

export const deleteData = async (url: string): Promise<void> => {
  try {
    const response = await axios.delete(url);

    if(response.status === 204) {
      toast.success('Elemento eliminado con exito', { duration: 3000 });
    } else {
      console.error('Error al intentar eliminar el elemento');
    }
  } catch(error) {
    console.error('Error al intentar eliminar el elemento');
    throw error;
  }
}