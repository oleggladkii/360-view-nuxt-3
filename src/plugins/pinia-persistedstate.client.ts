import { createPersistedState } from "pinia-plugin-persistedstate";
import { usePinia } from "#imports";

export default defineNuxtPlugin(() => {
  const pinia = usePinia();
  pinia.use(createPersistedState());
});

