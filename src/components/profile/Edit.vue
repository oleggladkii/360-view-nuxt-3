<template>
  <form class="flex flex-col gap-8" @submit.prevent="handleSubmit">
    
    <!-- Profile Section -->
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        <!-- Avatar (kept for functionality, though not in screenshot main form) -->
        <div class="md:col-span-2 flex justify-center mb-4">
           <div class="flex flex-col items-center gap-4">
            <div
              class="flex h-28 w-28 items-center justify-center rounded-full border border-gray-200 bg-gray-50 overflow-hidden relative group cursor-pointer"
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
                class="h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M15.232 5.232a2.5 2.5 0 0 1 3.536 3.536L9 18.536 5 19.5l.964-4L15.232 5.232z" />
              </svg>
              
              <!-- Hover overlay for edit hint -->
              <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        <!-- Full Name -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-name">
            Full Name
          </label>
          <input
            id="profile-name"
            v-model="form.full_name"
            type="text"
            placeholder="Name Surname"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
            autocomplete="name"
          >
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-phone">
            Personal phone number
          </label>
          <input
              id="profile-phone"
              v-model="form.phone"
              type="tel"
              placeholder="+380 44 123 45 67"
              class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
              autocomplete="tel"
            >
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-email">
            Your e-mail
          </label>
          <input
            id="profile-email"
            v-model="form.email"
            type="email"
            disabled
            placeholder="mail@example.com"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-500 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow cursor-not-allowed opacity-75"
            autocomplete="email"
          >
        </div>

        <!-- Website -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-website">
            Website
          </label>
          <input
            id="profile-website"
            v-model="form.website"
            type="url"
            placeholder="https://example.com"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
            autocomplete="url"
          >
        </div>
        
         <!-- Instagram -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-instagram">
            Instagram
          </label>
          <input
            id="profile-instagram"
            v-model="form.instagram"
            type="text"
             placeholder="@username"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
          >
        </div>

        <!-- Facebook -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-facebook">
            Facebook
          </label>
          <input
            id="profile-facebook"
            v-model="form.facebook"
            type="text"
             placeholder="username"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
          >
        </div>

         <!-- Linkedin -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1" for="profile-linkedin">
            Linkedin
          </label>
          <input
            id="profile-linkedin"
            v-model="form.linkedin"
            type="text"
             placeholder="username"
            class="w-full rounded-2xl border-none bg-gray-50 px-5 py-3.5 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-[#0099ff] focus:outline-none transition-shadow"
          >
        </div>

      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end mt-8">
      <button
        type="submit"
        class="rounded-2xl bg-[#0099ff] px-12 py-4 text-sm font-bold text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

