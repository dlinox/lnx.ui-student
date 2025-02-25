import { type Directive } from "vue";

//input: <input v-upper-case />
const upperCase: Directive = {
  beforeMount(el) {
    // Escucha los eventos de entrada para modificar el valor
    el.addEventListener("input", (event: any) => {
      const value = event.target.value.toUpperCase();
      // Establece el valor en mayúsculas
      event.target.value = value;
      // Dispara el evento para sincronizar el v-model
      event.target.dispatchEvent(new Event("input"));
    });
  },
};

export default upperCase;
