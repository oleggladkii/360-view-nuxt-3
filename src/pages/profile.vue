<template>
  <section class="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 py-16 text-gray-900">
    <div class="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:gap-20">
      <aside class="flex flex-col gap-6 lg:w-64">
        <nav class="flex flex-col gap-3 text-left">
          <button
            type="button"
            class="rounded-md border px-4 py-3 text-left text-sm font-semibold transition"
            :class="[
              activeTab === 'settings'
                ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                : 'border-transparent bg-transparent text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900',
            ]"
            @click="navigateToTab('settings')"
          >
            Profile
          </button>
          <button
            type="button"
            class="rounded-md border px-4 py-3 text-left text-sm font-semibold transition"
            :class="[
              activeTab === 'tours'
                ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                : 'border-transparent bg-transparent text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900',
            ]"
            @click="navigateToTab('tours')"
          >
            Tours
          </button>
        </nav>
      </aside>
      <div class="flex-1">
        <ProfileTours v-if="activeTab === 'tours'" />
        <ProfileEdit
          v-if="activeTab === 'settings'"
          :initial-values="profileInitialValues"
          :is-saving="isSavingProfile"
          @save="handleSaveProfile"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import type { Profile, ProfileFormValues } from "~/interfaces/Profile";

const toast = useToast();

useHead({
  title: "My Profile",
});

definePageMeta({ auth: true, middleware: "auth" });

type TabId = "settings" | "tours";

const route = useRoute();
const router = useRouter();

if (!route.query.tab) {
  await navigateTo({ path: "/profile", query: { tab: "settings" } });
}

const activeTab = computed<TabId>(() => {
  return route.query.tab === "tours" ? "tours" : "settings";
});

const isSavingProfile = ref(false);

const { data: profileData, error: profileError } = await useFetch<{ profile: Profile }>("/api/profile", {
  headers: useRequestHeaders(["cookie"]),
});

const convertProfileToFormValues = (profile: Profile): ProfileFormValues => {
  return {
    email: profile.email,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    phone: profile.phone,
    website: profile.website,
    instagram: profile.instagram,
    facebook: profile.facebook,
    linkedin: profile.linkedin,
  };
};

const createEmptyFormValues = (): ProfileFormValues => {
  return {
    email: null,
    full_name: null,
    avatar_url: null,
    phone: null,
    website: null,
    instagram: null,
    facebook: null,
    linkedin: null,
  };
};
const profileInitialValues = ref<ProfileFormValues>(
  profileData.value?.profile
    ? convertProfileToFormValues(profileData.value.profile)
    : createEmptyFormValues(),
);

if (profileError.value) {
  console.error("Failed to load profile:", profileError.value);
}

const navigateToTab = (tab: TabId) => {
  router.push({ path: "/profile", query: { tab } });
};

const handleSaveProfile = async (values: ProfileFormValues) => {
  try {
    isSavingProfile.value = true;
    const { error } = await $fetch("/api/profile", {
      method: "PUT",
      body: values,
    });
    if (error) {
      toast.error({ message: 'Failed to update your profile.' })
      throw error;
    }
    toast.success({ message: 'Your profile has been updated successfully.' })
  } finally {
    isSavingProfile.value = false;
  }
};
</script>