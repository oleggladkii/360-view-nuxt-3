<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="state.email"
        type="email"
        placeholder="Email"
        autocomplete="new-password"
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
        autocomplete="new-password"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.password.$error }"
        @blur="v$.password.$touch()"
      >
      <p v-if="v$.password.$error" class="mt-2 text-sm text-red-600">
        {{ passwordErrorMessage }}
      </p>
    </div>

    <div>
      <input
        v-model="state.confirmPassword"
        type="password"
        placeholder="Confirm password"
        autocomplete="new-password"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.confirmPassword.$error }"
        @blur="v$.confirmPassword.$touch()"
      >
      <p v-if="v$.confirmPassword.$error" class="mt-2 text-sm text-red-600">
        {{ confirmPasswordErrorMessage }}
      </p>
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>

    <div class="text-sm">
      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer" @click="onSwitchToLogin">
        Already have an account? Sign in
      </button>
    </div>

    <button
      type="submit"
      class="w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      :class="{ 'opacity-70 cursor-not-allowed': loading, 'cursor-pointer': !loading }"
      :disabled="loading"
    >
      {{ loading ? 'Creating account…' : 'Create account' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators";

type RegistrationFormPayload = {
  email: string;
  password: string;
  confirmPassword: string;
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
  (event: "submit", payload: { email: string; password: string }): void;
  (event: "switch-to-login"): void;
}>();

const state = reactive<RegistrationFormPayload>({
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Enter a valid email.", email),
  },
  password: {
    required: helpers.withMessage("Password is required.", required),
    minLength: helpers.withMessage("Password must be at least 8 characters.", minLength(8)),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm password is required.", required),
    sameAs: helpers.withMessage("Passwords must match.", sameAs(state.password)),
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

const confirmPasswordErrorMessage = computed(() => {
  if (!v$.value.confirmPassword.$error) {
    return "";
  }

  if (!v$.value.confirmPassword.required) {
    return v$.value.confirmPassword.required.$message as string;
  }

  if (!v$.value.confirmPassword.sameAs) {
    return v$.value.confirmPassword.sameAs.$message as string;
  }

  return "Passwords do not match.";
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  emit("submit", { email: state.email, password: state.password });
};

const onSwitchToLogin = () => {
  emit("switch-to-login");
};
</script>

