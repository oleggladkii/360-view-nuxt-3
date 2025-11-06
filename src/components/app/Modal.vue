<template>
  <Teleport to="body">
    <transition name="fade" mode="out-in">
      <div v-if="isOpen" class="fixed inset-0 z-1000">
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
          :aria-hidden="true"
          @click="close"
        />

        <div class="absolute inset-0 flex items-center justify-center p-4" @click.self="close">
          <div
            class="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
            :class="props.maxWidthClass"
            role="dialog"
            aria-modal="true"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  closeOnEsc?: boolean
  maxWidthClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  closeOnEsc: true,
  maxWidthClass: 'max-w-md',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
});

const isClient = typeof window !== 'undefined'

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('close')
}

const onKeydown = (e: KeyboardEvent) => {
  if (!props.closeOnEsc) return
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
  }
}

watch(
  () => isOpen.value,
  (val) => {
    if (!isClient) return
    if (val) {
      document.body.classList.add('overflow-hidden')
      emit('open')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  },
  { immediate: false }
)

onMounted(() => {
  if (!isClient) return
  window.addEventListener('keydown', onKeydown)
  if (isOpen.value) {
    document.body.classList.add('overflow-hidden')
    emit('open')
  }
})

onBeforeUnmount(() => {
  if (!isClient) return
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('overflow-hidden')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>

