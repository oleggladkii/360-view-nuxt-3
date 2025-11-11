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

    <div v-if="successMessage" class="text-sm text-green-600">
      {{ successMessage }}
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>

    <div class="text-sm">
      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer" @click="onSwitchToLogin">
        Back to sign in
      </button>
    </div>

    <button
      type="submit"
      class="w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      :class="{ 'opacity-70 cursor-not-allowed': loading, 'cursor-pointer': !loading }"
      :disabled="loading"
    >
      {{ loading ? 'Sending reset link…' : 'Send reset link' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";

withDefaults(
  defineProps<{
    loading?: boolean;
    error?: string | null;
    successMessage?: string | null;
  }>(),
  {
    loading: false,
    error: null,
    successMessage: null,
  },
);

const emit = defineEmits<{
  (event: "submit", payload: { email: string }): void;
  (event: "switch-to-login"): void;
}>();

const state = reactive({
  email: "",
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Enter a valid email.", email),
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

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  emit("submit", { email: state.email });
};

const onSwitchToLogin = () => {
  emit("switch-to-login");
};
</script>

