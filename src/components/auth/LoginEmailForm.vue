<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="state.email"
        type="email"
        placeholder="Email address"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.email.$error }"
        @blur="v$.email.$touch()"
      >
      <p v-if="v$.email.$error" class="mt-2 text-sm text-red-600">
        {{ emailErrorMessage }}
      </p>
    </div>

    <div>
      <input
        v-model="state.password"
        type="password"
        placeholder="Password"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.password.$error }"
        @blur="v$.password.$touch()"
      >
      <p v-if="v$.password.$error" class="mt-2 text-sm text-red-600">
        {{ passwordErrorMessage }}
      </p>
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>

    <div class="flex justify-between text-sm">
      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer" @click="onForgotPassword">
        Forgot password?
      </button>
      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer" @click="onSwitchToRegister">
        Create account
      </button>
    </div>

    <button
      type="submit"
      class="w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      :class="{ 'opacity-70 cursor-not-allowed': loading, 'cursor-pointer': !loading }"
      :disabled="loading"
    >
      {{ loading ? 'Signing in…' : 'Sign in' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";

type LoginFormPayload = {
  email: string;
  password: string;
};

withDefaults(
  defineProps<{
    loading?: boolean;
    error?: string | null;
  }>(),
  {
    loading: false,
    error: null,
  },
);

const emit = defineEmits<{
  (event: "submit", payload: LoginFormPayload): void;
  (event: "switch-to-register" | "switch-to-reset"): void;
}>();

const state = reactive<LoginFormPayload>({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Enter a valid email.", email),
  },
  password: {
    required: helpers.withMessage("Password is required.", required),
    minLength: helpers.withMessage("Password must be at least 6 characters.", minLength(6)),
  },
}));

const v$ = useVuelidate(rules, state);

const emailErrorMessage = computed(() => {
  if (!v$.value.email.$error) {
    return "";
  }

  if (!v$.value.email.required) {
    return v$.value.email.required.$message as string;
  }

  if (!v$.value.email.email) {
    return v$.value.email.email.$message as string;
  }

  return "Email is invalid.";
});

const passwordErrorMessage = computed(() => {
  if (!v$.value.password.$error) {
    return "";
  }

  if (!v$.value.password.required) {
    return v$.value.password.required.$message as string;
  }

  if (!v$.value.password.minLength) {
    return v$.value.password.minLength.$message as string;
  }

  return "Password is invalid.";
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  emit("submit", { ...state });
};

const onForgotPassword = () => {
  emit("switch-to-reset");
};

const onSwitchToRegister = () => {
  emit("switch-to-register");
};
</script>

