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

  watch(isLoginModalOpen, (open) => {
    if (!open) {
      const route = useRoute();
      const router = useRouter();
      if (route.query.login) {
        const newQuery = { ...route.query };
        delete newQuery.login;
        router.replace({ query: newQuery });
      }
    }
  });

  return {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    toggleLoginModal,
  };
});


