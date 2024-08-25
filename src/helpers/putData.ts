import axios from "axios";
import { toast } from "sonner";

export const putData = async <T>(url: string, data: T): Promise<void> => {
  try {
    const response = await axios.put(url, data);

    if (response.status === 204) {
      toast.success("Elemento editado con exito", { duration: 3000 });
    } else {
      toast.error("Error al intentar editar el elemento", { duration: 3000 });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}