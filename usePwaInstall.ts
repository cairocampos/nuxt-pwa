import type { BeforeInstallPromptEvent } from '@vite-pwa/nuxt/dist/runtime/plugins/types.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function usePwaInstall() {
  const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
  const isInstallPromptAvailable = ref(false)

  const promptInstall = async () => {
    if (!deferredPrompt.value) return
    const prompt = deferredPrompt.value as any
    prompt.prompt()

    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação')
    } else {
      console.log('Usuário recusou a instalação')
    }

    deferredPrompt.value = null
    isInstallPromptAvailable.value = false
  }

  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    isInstallPromptAvailable.value = true
  }

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  return {
    isInstallPromptAvailable,
    promptInstall
  }
}
