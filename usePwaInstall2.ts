// composables/usePWAInstall.js
export const usePWAInstall = () => {
  const showInstallButton = ref(false)
  const isInstalling = ref(false)
  let deferredPrompt = null

  const setupInstallPrompt = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      showInstallButton.value = true
    })

    window.addEventListener('appinstalled', () => {
      showInstallButton.value = false
      deferredPrompt = null
    })
  }

  const installPWA = async () => {
    if (!deferredPrompt) return

    isInstalling.value = true
    
    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      return outcome === 'accepted'
    } catch (error) {
      console.error('Erro ao instalar PWA:', error)
      return false
    } finally {
      isInstalling.value = false
      deferredPrompt = null
      showInstallButton.value = false
    }
  }

  return {
    showInstallButton,
    isInstalling,
    setupInstallPrompt,
    installPWA
  }
}