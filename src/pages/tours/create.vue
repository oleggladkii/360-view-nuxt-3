<template>
  <section class="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 py-16 text-gray-900">
    <div class="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-12">
      <header>
        <h1 class="text-3xl font-semibold text-gray-900">Create New Tour</h1>
        <p class="mt-2 text-sm text-gray-500">
          Fill in the details below to create a new virtual tour.
        </p>
      </header>

      <TourCreateEditForm mode="create" :is-submitting="isSubmitting" @submit="handleSubmit" />
    </div>
  </section>
</template>

<script setup lang="ts">
const toast = useToast();
const router = useRouter();

useHead({
  title: "Create Tour",
});

definePageMeta({ auth: true, middleware: "auth" });

const isSubmitting = ref(false);

const handleSubmit = async (payload: Record<string, unknown>) => {
  try {
    isSubmitting.value = true;

    await $fetch("/api/tours", {
      method: "POST",
      body: payload,
    });

    toast.success({ message: "Tour created successfully." });
    await router.push("/profile?tab=tours");
  } catch (error) {
    console.error("Failed to create tour:", error);
    toast.error({ message: "Failed to create tour. Please try again." });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

