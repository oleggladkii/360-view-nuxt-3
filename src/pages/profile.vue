<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans pt-16">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-[#0099ff] text-white flex flex-col shrink-0">
      <!-- Navigation -->
      <nav class="flex-1 px-4 space-y-2">
        <button
          type="button"
          class="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left"
          :class="activeTab === 'tours' ? 'text-white font-semibold' : 'text-white/80 hover:text-white hover:bg-white/10'"
          @click="navigateToTab('tours')"
        >
          <div class="flex items-center w-full relative">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            My tours
            <div v-if="activeTab === 'tours'" class="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
          </div>
        </button>

        <button
          type="button"
          class="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left"
          :class="activeTab === 'settings' ? 'text-white font-semibold' : 'text-white/80 hover:text-white hover:bg-white/10'"
          @click="navigateToTab('settings')"
        >
          <div class="flex items-center w-full relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
             <div v-if="activeTab === 'settings'" class="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
          </div>
        </button>
      </nav>


    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-5xl mx-auto">
        
        <div class="bg-white rounded-3xl shadow-sm p-8 min-h-[600px]">
          <ProfileTours v-if="activeTab === 'tours'" />
          <ProfileEdit
            v-if="activeTab === 'settings'"
            :initial-values="profileInitialValues"
            :is-saving="isSavingProfile"
            @save="handleSaveProfile"
          />
        </div>
      </div>
    </main>
  </div>
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