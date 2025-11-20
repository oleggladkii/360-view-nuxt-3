<template>
  <section class="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 py-16 text-gray-900">
    <div class="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-12">
      <header>
        <h1 class="text-3xl font-semibold text-gray-900">Edit Tour</h1>
        <p class="mt-2 text-sm text-gray-500">
          Update the details of your virtual tour.
        </p>
      </header>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-500">Loading tour...</p>
      </div>

      <TourCreateEditForm
        v-else
        mode="edit"
        :initial-data="tourData"
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Tour } from "~/interfaces/Tour";

const route = useRoute();
const toast = useToast();
const router = useRouter();

useHead({
  title: "Edit Tour",
});

definePageMeta({ auth: true, middleware: "auth" });

const isSubmitting = ref(false);
const isLoading = ref(true);
const tourData = ref<{
  name?: string;
  description?: string;
  url_slug?: string;
  preview_url?: string;
  tour_date?: string;
  time_of_day?: "day" | "night" | null;
  gpx_path?: string;
}>({});
const tourId = computed(() => route.params.id as string);

const loadTour = async () => {
  try {
    isLoading.value = true;
    const tour = await $fetch<Tour>(`/api/tours/${tourId.value}`, {
      headers: useRequestHeaders(["cookie"]),
    });

    tourData.value = {
      name: tour.name || "",
      description: tour.description || "",
      url_slug: tour.url_slug || "",
      preview_url: tour.preview_url || "",
      tour_date: tour.tour_date || "",
      time_of_day: (tour.time_of_day === "day" || tour.time_of_day === "night" ? tour.time_of_day : null) as "day" | "night" | null,
      gpx_path: tour.gpx_path || "",
    };
  } catch (error) {
    console.error("Failed to load tour:", error);
    toast.error({ message: "Failed to load tour. Please try again." });
    await router.push("/profile?tab=tours");
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async (payload: Record<string, unknown>) => {
  try {
    isSubmitting.value = true;

    await $fetch(`/api/tours/${tourId.value}`, {
      method: "PUT",
      body: payload,
    });

    toast.success({ message: "Tour updated successfully." });
    await router.push("/profile?tab=tours");
  } catch (error) {
    console.error("Failed to update tour:", error);
    toast.error({ message: "Failed to update tour. Please try again." });
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  loadTour();
});
</script>

