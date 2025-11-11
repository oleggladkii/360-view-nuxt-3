<template>
  <AppModal v-model="isLoginModalOpen" :max-width-class="'max-w-lg'">
    <div class="p-6 sm:p-8">
      <div class="text-center">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
          {{ heading }}
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          {{ subheading }}
        </p>
      </div>

      <div class="mt-8">
        <LoginEmailForm
          v-if="activeForm === 'login'"
          :loading="loading"
          :error="formError"
          @submit="handleLoginSubmit"
          @switch-to-register="switchForm('register')"
          @switch-to-reset="switchForm('reset')"
        />

        <RegistrationEmailForm
          v-else-if="activeForm === 'register'"
          :loading="loading"
          :error="formError"
          @submit="handleRegisterSubmit"
          @switch-to-login="switchForm('login')"
        />

        <ResetPasswordForm
          v-else
          :loading="loading"
          :error="formError"
          :success-message="resetSuccessMessage"
          @submit="handleResetSubmit"
          @switch-to-login="switchForm('login')"
        />
      </div>

      <div v-if="activeForm !== 'reset'" class="my-6 flex items-center gap-4">
        <div class="h-px flex-1 bg-gray-200" />
        <span class="text-gray-500 text-sm">OR</span>
        <div class="h-px flex-1 bg-gray-200" />
      </div>

      <button
        v-if="activeForm !== 'reset'"
        type="button"
        class="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-800 font-medium shadow-sm hover:bg-gray-50"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
        :disabled="loading"
        @click="loginWithGoogle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5">
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.145,35.091,26.715,36,24,36  c-5.202,0-9.616-3.317-11.283-7.946l-6.533,5.034C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.236-2.231,4.166-4.091,5.565  c0.001-0.001,0.002-0.001,0.003-0.002l6.197,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import LoginEmailForm from "~/components/auth/LoginEmailForm.vue";
import RegistrationEmailForm from "~/components/auth/RegistrationEmailForm.vue";
import ResetPasswordForm from "~/components/auth/ResetPasswordForm.vue";
import { useUiStore } from "~/stores/ui";

type ActiveForm = "login" | "register" | "reset";

const ui = useUiStore();
const { isLoginModalOpen } = storeToRefs(ui);

const auth = useAuthStore();

const activeForm = ref<ActiveForm>("login");
const loading = ref(false);
const formError = ref<string | null>(null);
const resetSuccessMessage = ref<string | null>(null);

const heading = computed(() => {
  if (activeForm.value === "register") {
    return "Create your free account.";
  }
  if (activeForm.value === "reset") {
    return "Reset your password.";
  }
  return "Login or register to watch unlimited tours for free.";
});

const subheading = computed(() => {
  if (activeForm.value === "register") {
    return "Sign up with your email to start exploring.";
  }
  if (activeForm.value === "reset") {
    return "Enter the email associated with your account.";
  }
  return "Sign in with email and password or continue with Google.";
});

const resetFeedback = () => {
  formError.value = null;
  resetSuccessMessage.value = null;
};

const switchForm = (form: ActiveForm) => {
  activeForm.value = form;
  resetFeedback();
};

const handleLoginSubmit = async (payload: { email: string; password: string }) => {
  resetFeedback();
  loading.value = true;
  try {
    await auth.loginWithEmail(payload);
    ui.closeLoginModal();
  } catch (error) {
    formError.value = extractErrorMessage(error);
  } finally {
    loading.value = false;
  }
};

const handleRegisterSubmit = async (payload: { email: string; password: string }) => {
  resetFeedback();
  loading.value = true;
  try {
    await auth.registerWithEmail(payload);
    ui.closeLoginModal();
  } catch (error) {
    formError.value = extractErrorMessage(error);
  } finally {
    loading.value = false;
  }
};

const handleResetSubmit = async (payload: { email: string }) => {
  resetFeedback();
  loading.value = true;
  try {
    await auth.resetPassword(payload.email);
    resetSuccessMessage.value = "Password reset email has been sent if the email exists.";
  } catch (error) {
    formError.value = extractErrorMessage(error);
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = async () => {
  loading.value = true;
  try {
    await auth.loginWithGoogle();
  } catch (error) {
    formError.value = extractErrorMessage(error);
  } finally {
    loading.value = false;
  }
};

const extractErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: string }).message;
    if (message) {
      return message;
    }
  }
  return "Something went wrong. Please try again.";
};

watch(isLoginModalOpen, (newVal) => {
  if (!newVal) {
    activeForm.value = "login";
    resetFeedback();
  }
});
</script>
