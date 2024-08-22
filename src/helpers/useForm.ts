import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [formState, setFormState] = useState(initialState);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: name === 'categoriaId' ? Number(value) : value
    });
  };

  const resetForm = () =>{
    setFormState(initialState);
  }

  return {
    formState,
    setFormState,
    onInputChange,
    resetForm
  };
}