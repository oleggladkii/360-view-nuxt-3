<template>
  <form class="flex flex-col gap-8" novalidate @submit.prevent="handleSubmit">
    <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-name">
            Tour Name
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
            URL Slug
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
          <ClientOnly>
            <div
              class="rounded-md border border-gray-300 bg-white shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900"
              :class="{ 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30': v$.description.$error }"
            >
              <QuillEditor
                id="tour-description"
                v-model:content="form.description"
                content-type="html"
                theme="snow"
                :toolbar="toolbarOptions"
                placeholder="Enter tour description"
                class="min-h-[150px]"
              />
            </div>
            <template #fallback>
              <div
                class="rounded-md border border-gray-300 bg-white shadow-sm px-3 py-2 min-h-[150px]"
                :class="{ 'border-red-500': v$.description.$error }"
              >
                <textarea
                  v-model="form.description"
                  rows="6"
                  class="w-full border-0 focus:outline-none resize-none"
                  placeholder="Enter tour description"
                />
              </div>
            </template>
          </ClientOnly>
          <p v-if="v$.description.$error" class="text-xs text-red-600">
            {{ descriptionErrorMessage }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-date">
              Tour Date
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
              Time of Day
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

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-country">
              Country
            </label>
            <input
              id="tour-country"
              v-model="form.country"
              type="text"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.country.$error }"
              placeholder="Enter country"
            >
            <p v-if="v$.country.$error" class="text-xs text-red-600">
              {{ countryErrorMessage }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-city">
              City
            </label>
            <input
              id="tour-city"
              v-model="form.city"
              type="text"
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/30': v$.city.$error }"
              placeholder="Enter city"
            >
            <p v-if="v$.city.$error" class="text-xs text-red-600">
              {{ cityErrorMessage }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-preview-file">
            Preview Image
          </label>
          <div class="flex items-center justify-between gap-2">
            <input
              v-if="!form.preview_url || v$.preview_url.$error"
              id="tour-preview-file"
              type="file"
              accept="image/*"
              class="block flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              :class="{ 'border-red-500': v$.preview_url.$error }"
              @change="handlePreviewUpload"
            >
            <p v-else class="text-xs text-green-600">Preview image uploaded</p>
            <button
              v-if="form.preview_url && previewStoragePath"
              type="button"
              class="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              @click="handlePreviewDelete"
            >
              Delete
            </button>
          </div>
          <p v-if="uploadingPreview" class="text-xs text-blue-600">Uploading Preview...</p>
          <p v-if="deletingPreview" class="text-xs text-blue-600">Deleting Preview...</p>
          <p v-if="v$.preview_url.$error" class="text-xs text-red-600">
            {{ previewUrlErrorMessage }}
          </p>
          <div v-if="form.preview_url" class="mt-2">
            <img :src="form.preview_url" alt="Preview" class="h-48 w-full rounded-md object-cover" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-gpx-file">
            GPX File
          </label>
          <div class="flex items-center justify-between gap-2">
            <input
              v-if="!form.gpx_path || v$.gpx_path.$error"
              id="tour-gpx-file"
              type="file"
              accept=".gpx"
              class="block flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              :class="{ 'border-red-500': v$.gpx_path.$error }"
              @change="handleGpxUpload"
            >
            <p v-else class="text-xs text-green-600">GPX file uploaded</p>
            <button
              v-if="form.gpx_path && gpxStoragePath"
              type="button"
              class="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              @click="handleGpxDelete"
            >
              Delete
            </button>
          </div>
          <p v-if="uploadingGpx" class="text-xs text-blue-600">Uploading GPX...</p>
          <p v-if="deletingGpx" class="text-xs text-blue-600">Deleting GPX...</p>
          <p v-if="v$.gpx_path.$error" class="text-xs text-red-600">
            {{ gpxPathErrorMessage }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold uppercase tracking-wide text-gray-400" for="tour-video-file">
            360° Video File
          </label>
          <div class="flex items-center justify-between align-center gap-2">
            <input
              v-if="!form.video_url || v$.video_url.$error"
              id="tour-video-file"
              type="file"
              accept="video/*"
              class="block flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              :class="{ 'border-red-500': v$.video_url.$error }"
              @change="handleVideoUpload"
            >
            <p v-else class="text-xs text-green-600">Video uploaded</p>
            <button
              v-if="form.video_url && videoStoragePath"
              type="button"
              class="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              @click="handleVideoDelete"
            >
              Delete
            </button>
          </div>
          <p v-if="uploadingVideo" class="text-xs text-blue-600">Uploading Video...</p>
          <p v-if="deletingVideo" class="text-xs text-blue-600">Deleting Video...</p>
          <p v-if="v$.video_url.$error" class="text-xs text-red-600">
            {{ videoUrlErrorMessage }}
          </p>
          <div v-if="form.video_url" class="mt-2">
            <video :src="form.video_url" controls class="h-48 w-full rounded-md bg-black" />
          </div>
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
interface TourForm {
  name: string;
  description: string;
  url_slug: string;
  preview_url: string;
  tour_date: string;
  time_of_day: "day" | "night" | null;
  gpx_path: string;
  video_url?: string;
  country: string;
  city: string;
}

interface Props {
  mode: "create" | "edit";
  initialData?: Partial<TourForm>;
  isSubmitting?: boolean;
  tourId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
  initialData: undefined,
  tourId: undefined,
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
  video_url: props.initialData?.video_url || "",
  country: props.initialData?.country || "",
  city: props.initialData?.city || "",
});

const client = useSupabaseClient();
const toast = useToast();
const uploadingGpx = ref(false);
const uploadingVideo = ref(false);
const uploadingPreview = ref(false);
const deletingGpx = ref(false);
const deletingVideo = ref(false);
const deletingPreview = ref(false);

const previewStoragePath = ref<string | null>(null);
const gpxStoragePath = ref<string | null>(null);
const videoStoragePath = ref<string | null>(null);

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ header: [1, 2, 3, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link"],
  ["clean"],
];

const extractStoragePathFromUrl = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    let pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/public-asset\/(.+)/);
    if (pathMatch) return pathMatch[1];
    
    pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/public-assets\/(.+)/);
    if (pathMatch) return pathMatch[1];

    pathMatch = urlObj.pathname.match(/^\/(images|videos|gpx-files)\/(.+)/);
    if (pathMatch) return pathMatch[0].substring(1);
    
    return null;
  } catch {
    try {
      const pathMatch = url.match(/\/storage\/v1\/object\/public\/public-asset[s]?\/(.+)/);
      if (pathMatch) return pathMatch[1];
      
      const directPathMatch = url.match(/\/(images|videos|gpx-files)\/(.+)/);
      if (directPathMatch) return directPathMatch[0].substring(1);
      
      return null;
    } catch {
      return null;
    }
  }
};

const handleGpxUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    uploadingGpx.value = true;

    const ext = file.name.split('.').pop() || 'gpx';
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const tourIdValue = props.tourId || crypto.randomUUID();
    const filePath = `gpx-files/${tourIdValue}/${fileName}`;

    const { data, error } = await client.storage
      .from('public-asset')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = client.storage.from('public-asset').getPublicUrl(data.path);

    form.gpx_path = publicUrl;
    gpxStoragePath.value = data.path;
    toast.success({ message: 'GPX file uploaded successfully' });
  } catch (error) {
    console.error('Error uploading GPX:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to upload GPX file';
    toast.error({ message: errorMsg });
  } finally {
    uploadingGpx.value = false;
  }
};

const handleVideoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    uploadingVideo.value = true;

    const ext = file.name.split('.').pop() || 'mp4';
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const tourIdValue = props.tourId || crypto.randomUUID();
    const filePath = `videos/${tourIdValue}/${fileName}`;

    const { data, error } = await client.storage
      .from('public-asset')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = client.storage.from('public-asset').getPublicUrl(data.path);

    form.video_url = publicUrl;
    videoStoragePath.value = data.path;
    toast.success({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Video:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to upload Video';
    toast.error({ message: errorMsg });
  } finally {
    uploadingVideo.value = false;
  }
};

const handlePreviewUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    uploadingPreview.value = true;

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const tourIdValue = props.tourId || crypto.randomUUID();
    const filePath = `images/${tourIdValue}/${fileName}`;

    const { data, error } = await client.storage
      .from('public-asset')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = client.storage.from('public-asset').getPublicUrl(data.path);

    form.preview_url = publicUrl;
    previewStoragePath.value = data.path;
    toast.success({ message: 'Preview image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Preview:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to upload Preview image';
    toast.error({ message: errorMsg });
  } finally {
    uploadingPreview.value = false;
  }
};

const handlePreviewDelete = async () => {
  if (!previewStoragePath.value) return;

  try {
    deletingPreview.value = true;

    const { error } = await client.storage
      .from('public-asset')
      .remove([previewStoragePath.value]);

    if (error) {
      throw error;
    }

    form.preview_url = "";
    previewStoragePath.value = null;
    toast.success({ message: 'Preview image deleted successfully' });
  } catch (error) {
    console.error('Error deleting Preview:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete Preview image';
    toast.error({ message: errorMsg });
  } finally {
    deletingPreview.value = false;
  }
};

const handleGpxDelete = async () => {
  if (!gpxStoragePath.value) return;

  try {
    deletingGpx.value = true;

    const { error } = await client.storage
      .from('public-asset')
      .remove([gpxStoragePath.value]);

    if (error) {
      throw error;
    }

    form.gpx_path = "";
    gpxStoragePath.value = null;
    toast.success({ message: 'GPX file deleted successfully' });
  } catch (error) {
    console.error('Error deleting GPX:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete GPX file';
    toast.error({ message: errorMsg });
  } finally {
    deletingGpx.value = false;
  }
};

const handleVideoDelete = async () => {
  if (!videoStoragePath.value) return;

  try {
    deletingVideo.value = true;

    const { error } = await client.storage
      .from('public-asset')
      .remove([videoStoragePath.value]);

    if (error) {
      throw error;
    }

    form.video_url = "";
    videoStoragePath.value = null;
    toast.success({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting Video:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete Video';
    toast.error({ message: errorMsg });
  } finally {
    deletingVideo.value = false;
  }
};

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
  description: {
    required: helpers.withMessage("Description is required.", (value: string) => {
      if (!value) return false;
      const textContent = value.replace(/<[^>]*>/g, "").trim();
      return textContent.length > 0;
    }),
  },
  tour_date: {
    required: helpers.withMessage("Tour date is required.", required),
  },
  time_of_day: {
    required: helpers.withMessage("Time of day is required.", (value: string | null) => value !== null && value !== ""),
  },
  preview_url: {
    required: helpers.withMessage("Preview image is required.", required),
  },
  gpx_path: {
    required: helpers.withMessage("GPX file is required.", () => true),
  },
  video_url: {
    required: helpers.withMessage("360° video file is required.", () => true),
  },
  country: {
    required: helpers.withMessage("Country is required.", () => true),
  },
  city: {
    required: helpers.withMessage("City is required.", () => true),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const v$ = useVuelidate(rules, form as any);

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

const descriptionErrorMessage = computed(() => {
  if (!v$.value.description.$error) {
    return "";
  }

  if (!v$.value.description.required) {
    return (v$.value.description.required as { $message: string }).$message;
  }

  return "Description is invalid.";
});

const previewUrlErrorMessage = computed(() => {
  if (!v$.value.preview_url.$error) {
    return "";
  }

  if (!v$.value.preview_url.required) {
    return (v$.value.preview_url.required as { $message: string }).$message;
  }

  return "Preview image is invalid.";
});

const gpxPathErrorMessage = computed(() => {
  if (!v$.value.gpx_path.$error) {
    return "";
  }

  if (!v$.value.gpx_path.required) {
    return (v$.value.gpx_path.required as { $message: string }).$message;
  }

  return "GPX file is invalid.";
});

const videoUrlErrorMessage = computed(() => {
  if (!v$.value.video_url.$error) {
    return "";
  }

  if (!v$.value.video_url.required) {
    return (v$.value.video_url.required as { $message: string }).$message;
  }

  return "360° video file is invalid.";
});

const countryErrorMessage = computed(() => {
  if (!v$.value.country.$error) {
    return "";
  }

  if (!v$.value.country.required) {
    return (v$.value.country.required as { $message: string }).$message;
  }

  return "Country is invalid.";
});

const cityErrorMessage = computed(() => {
  if (!v$.value.city.$error) {
    return "";
  }

  if (!v$.value.city.required) {
    return (v$.value.city.required as { $message: string }).$message;
  }

  return "City is invalid.";
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

const initializeStoragePaths = () => {
  if (props.initialData) {
    if (props.initialData.preview_url) {
      previewStoragePath.value = extractStoragePathFromUrl(props.initialData.preview_url);
    }
    if (props.initialData.gpx_path) {
      gpxStoragePath.value = extractStoragePathFromUrl(props.initialData.gpx_path);
    }
    if (props.initialData.video_url) {
      videoStoragePath.value = extractStoragePathFromUrl(props.initialData.video_url);
    }
  }
};

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.description = newData.description || "";
      form.url_slug = newData.url_slug || "";
      form.preview_url = newData.preview_url || "";
      form.tour_date = newData.tour_date || "";
      form.time_of_day = (newData.time_of_day === "day" || newData.time_of_day === "night" ? newData.time_of_day : null) as "day" | "night" | null;
      form.gpx_path = newData.gpx_path || "";
      form.video_url = newData.video_url || "";
      form.country = newData.country || "";
      form.city = newData.city || "";

      initializeStoragePaths();
    }
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  initializeStoragePaths();
});

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
    description: form.description.trim(),
    tour_date: form.tour_date,
    time_of_day: form.time_of_day,
    preview_url: form.preview_url.trim(),
    gpx_path: form.gpx_path.trim(),
    video_url: form.video_url?.trim() || "",
    country: form.country.trim(),
    city: form.city.trim(),
  };

  emit("submit", payload);
};
</script>

<style scoped>
:deep(.ql-container) {
  font-size: 14px;
  min-height: 150px;
}

:deep(.ql-editor) {
  min-height: 150px;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border-bottom: 1px solid #d1d5db;
}

:deep(.ql-container) {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}
</style>

