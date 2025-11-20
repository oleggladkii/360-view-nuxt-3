<template>
  <form class="flex flex-col gap-12" @submit.prevent="handleSubmit">
    <div class="flex flex-col">
      <div class="flex-1">
        <div class="flex flex-col items-center gap-4 mb-4">
        <div
          class="flex h-28 w-28 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm overflow-hidden"
          aria-hidden="true"
        >
          <img
            v-if="proxiedAvatarUrl && isProxiedUrl"
            :src="proxiedAvatarUrl"
            alt="Profile avatar"
            class="h-full w-full object-cover"
          >
          <NuxtImg
            v-else-if="proxiedAvatarUrl"
            :src="proxiedAvatarUrl"
            alt="Profile avatar"
            width="112"
            height="112"
            class="h-full w-full object-cover"
            fit="cover"
          />
          <svg
            v-else
            class="h-7 w-7 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M15.232 5.232a2.5 2.5 0 0 1 3.536 3.536L9 18.536 5 19.5l.964-4L15.232 5.232z" />
          </svg>
        </div>
        <button
          type="button"
          class="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <!-- Change photo -->
        </button>
      </div>
        <div class="grid grid-cols-1 gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-name">
              Name
            </label>
            <input
              id="profile-name"
              v-model="form.full_name"
              type="text"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              autocomplete="name"
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              v-model="form.email"
              type="email"
              disabled
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              autocomplete="email"
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-phone">
              Phone
            </label>
            <input
              id="profile-phone"
              v-model="form.phone"
              type="tel"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              autocomplete="tel"
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-website">
              Website
            </label>
            <input
              id="profile-website"
              v-model="form.website"
              type="url"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              autocomplete="url"
            >
          </div>
        </div>
        <h2 class="mt-8 mb-4 text-lg font-semibold text-gray-700">Socials</h2>
        <div class="mt-8 flex flex-col gap-4">
          <div class="grid grid-cols-1 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-instagram">
                Instagram
              </label>
              <input
                id="profile-instagram"
                v-model="form.instagram"
                type="text"
                class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-facebook">
                Facebook
              </label>
              <input
                id="profile-facebook"
                v-model="form.facebook"
                type="text"
                class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="profile-linkedin">
                Linkedin
              </label>
              <input
                id="profile-linkedin"
                v-model="form.linkedin"
                type="text"
                class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 pt-6 flex justify-center">
      <button
        type="submit"
        class="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:w-48"
        :disabled="isSaving"
      >
        <span v-if="isSaving">Saving...</span>
        <span v-else>Save</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";

import type { ProfileFormValues } from "~/interfaces/Profile";

const props = defineProps<{
  initialValues: ProfileFormValues;
  isSaving?: boolean;
}>();

const emit = defineEmits<{
  (event: "save", payload: ProfileFormValues): void;
}>();

const form = reactive<ProfileFormValues>({ ...props.initialValues });

const { getProxiedImageUrl } = useImageProxy();

const proxiedAvatarUrl = computed(() => getProxiedImageUrl(form.avatar_url));

const isProxiedUrl = computed(() => {
  return proxiedAvatarUrl.value?.startsWith("/api/image-proxy") ?? false;
});

watch(
  () => props.initialValues,
  (values) => {
    Object.assign(form, values);
  },
  { deep: true },
);

const handleSubmit = () => {
  emit("save", { ...form });
};
</script>

