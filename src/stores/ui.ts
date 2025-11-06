import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', () => {
  const isLoginModalOpen = ref<boolean>(false);

  const openLoginModal = (): void => {
    isLoginModalOpen.value = true;
  };
  const closeLoginModal = (): void => {
    isLoginModalOpen.value = false;
  };
  const toggleLoginModal = (): void => {
    isLoginModalOpen.value = !isLoginModalOpen.value;
  };

  return {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    toggleLoginModal,
  };
});


