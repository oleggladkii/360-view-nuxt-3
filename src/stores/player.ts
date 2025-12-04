import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
    const currentTime = ref<number>(0)
    const isPlaying = ref<boolean>(false)
    const cameraRotation = ref<{ yaw: number; pitch: number; roll: number }>({
        yaw: 0,
        pitch: 0,
        roll: 0,
    })

    const setCurrentTime = (time: number) => {
        currentTime.value = time
    }

    const setIsPlaying = (playing: boolean) => {
        isPlaying.value = playing
    }

    const setCameraRotation = (rotation: { yaw: number; pitch: number; roll: number }) => {
        cameraRotation.value = rotation
    }

    return {
        currentTime,
        isPlaying,
        cameraRotation,
        setCurrentTime,
        setIsPlaying,
        setCameraRotation,
    }
})
