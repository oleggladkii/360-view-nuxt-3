<template>
  <form class="flex flex-col gap-8" novalidate @submit.prevent="handleSubmit">
    <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-name">
            Tour Name <span class="text-red-500">*</span>
          </label>
          <input
            id="tour-name"
            v-model="form.name"
            type="text"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.name.$error }"
            placeholder="Enter tour name"
          >
          <p v-if="v$.name.$error" class="text-xs text-red-600">
            {{ nameErrorMessage }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-url-slug">
            URL Slug <span class="text-red-500">*</span>
          </label>
          <input
            id="tour-url-slug"
            v-model="form.url_slug"
            type="text"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.url_slug.$error }"
            placeholder="my-awesome-tour"
            @input="onUrlSlugInput"
          >
          <p v-if="v$.url_slug.$error" class="text-xs text-red-600">
            {{ urlSlugErrorMessage }}
          </p>
          <p v-else class="text-xs text-gray-500">
            A URL-friendly identifier for your tour (e.g., "my-awesome-tour")
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-description">
            Description
          </label>
          <textarea
            id="tour-description"
            v-model="form.description"
            rows="4"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Enter tour description"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-preview-url">
            Preview URL
          </label>
          <input
            id="tour-preview-url"
            v-model="form.preview_url"
            type="url"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="https://example.com/preview.jpg"
          >
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-date">
              Tour Date <span class="text-red-500">*</span>
            </label>
            <input
              id="tour-date"
              v-model="form.tour_date"
              type="date"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.tour_date.$error }"
            >
            <p v-if="v$.tour_date.$error" class="text-xs text-red-600">
              {{ tourDateErrorMessage }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-time-of-day">
              Time of Day <span class="text-red-500">*</span>
            </label>
            <select
              id="tour-time-of-day"
              v-model="form.time_of_day"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.time_of_day.$error }"
            >
              <option :value="null">Select time</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
            <p v-if="v$.time_of_day.$error" class="text-xs text-red-600">
              {{ timeOfDayErrorMessage }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-gpx-path">
            GPX Path
          </label>
          <input
            id="tour-gpx-path"
            v-model="form.gpx_path"
            type="text"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="path/to/file.gpx"
          >
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-4 border-t border-gray-200 pt-6">
      <NuxtLink
        to="/profile?tab=tours"
        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        Cancel
      </NuxtLink>
      <button
        type="submit"
        class="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">{{ mode === "create" ? "Creating..." : "Updating..." }}</span>
        <span v-else>{{ mode === "create" ? "Create Tour" : "Update Tour" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

interface TourForm {
  name: string;
  description: string;
  url_slug: string;
  preview_url: string;
  tour_date: string;
  time_of_day: "day" | "night" | null;
  gpx_path: string;
}

interface Props {
  mode: "create" | "edit";
  initialData?: Partial<TourForm>;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
});

const emit = defineEmits<{
  (event: "submit", payload: Record<string, unknown>): void;
}>();

const form = reactive<TourForm>({
  name: props.initialData?.name || "",
  description: props.initialData?.description || "",
  url_slug: props.initialData?.url_slug || "",
  preview_url: props.initialData?.preview_url || "",
  tour_date: props.initialData?.tour_date || "",
  time_of_day: props.initialData?.time_of_day || null,
  gpx_path: props.initialData?.gpx_path || "",
});

const urlSlugManuallyEdited = ref(false);

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const isValidSlug = (value: string): boolean => {
  if (!value) {
    return false;
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(value);
};

const slugValidator = helpers.withMessage(
  "URL slug must contain only lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen.",
  (value: string) => isValidSlug(value),
);

const rules = computed(() => ({
  name: {
    required: helpers.withMessage("Tour name is required.", required),
  },
  url_slug: {
    required: helpers.withMessage("URL slug is required.", required),
    slugValidator,
  },
  tour_date: {
    required: helpers.withMessage("Tour date is required.", required),
  },
  time_of_day: {
    required: helpers.withMessage("Time of day is required.", (value: string | null) => value !== null && value !== ""),
  },
}));

const v$ = useVuelidate(rules, form);

const nameErrorMessage = computed(() => {
  if (!v$.value.name.$error) {
    return "";
  }

  if (!v$.value.name.required) {
    return (v$.value.name.required as { $message: string }).$message;
  }

  return "Tour name is invalid.";
});

const urlSlugErrorMessage = computed(() => {
  if (!v$.value.url_slug.$error) {
    return "";
  }

  if (!v$.value.url_slug.required) {
    return (v$.value.url_slug.required as { $message: string }).$message;
  }

  if (!v$.value.url_slug.slugValidator) {
    return (v$.value.url_slug.slugValidator as { $message: string }).$message;
  }

  return "URL slug is invalid.";
});

const tourDateErrorMessage = computed(() => {
  if (!v$.value.tour_date.$error) {
    return "";
  }

  if (!v$.value.tour_date.required) {
    return (v$.value.tour_date.required as { $message: string }).$message;
  }

  return "Tour date is invalid.";
});

const timeOfDayErrorMessage = computed(() => {
  if (!v$.value.time_of_day.$error) {
    return "";
  }

  if (!v$.value.time_of_day.required) {
    return (v$.value.time_of_day.required as { $message: string }).$message;
  }

  return "Time of day is invalid.";
});

watch(
  () => form.name,
  (newName) => {
    if (!urlSlugManuallyEdited.value && newName) {
      const generatedSlug = generateSlug(newName);
      if (generatedSlug) {
        form.url_slug = generatedSlug;
      }
    }
  },
);

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.description = newData.description || "";
      form.url_slug = newData.url_slug || "";
      form.preview_url = newData.preview_url || "";
      form.tour_date = newData.tour_date || "";
      form.time_of_day = newData.time_of_day || null;
      form.gpx_path = newData.gpx_path || "";
    }
  },
  { deep: true },
);

const onUrlSlugInput = () => {
  urlSlugManuallyEdited.value = true;
};

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  if (!form.url_slug && form.name) {
    form.url_slug = generateSlug(form.name);
  }

  const payload: Record<string, unknown> = {
    name: form.name,
    url_slug: form.url_slug,
    tour_date: form.tour_date,
    time_of_day: form.time_of_day,
  };

  if (form.description.trim()) {
    payload.description = form.description.trim();
  }

  if (form.preview_url.trim()) {
    payload.preview_url = form.preview_url.trim();
  }

  if (form.gpx_path.trim()) {
    payload.gpx_path = form.gpx_path.trim();
  }

  emit("submit", payload);
};
</script>

