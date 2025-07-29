export const usePWA = () => {
  const isInstalled = ref(false)
  const isUpdateAvailable = ref(false)
  
  const checkInstallStatus = () => {
    isInstalled.value = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as any).standalone === true
  }
  
  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    }
  }
  
  const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                isUpdateAvailable.value = true
              }
            })
          }
        })
      }
    }
  }
  
  onMounted(() => {
    checkInstallStatus()
    checkForUpdates()
  })
  
  return {
    isInstalled: readonly(isInstalled),
    isUpdateAvailable: readonly(isUpdateAvailable),
    updateServiceWorker,
    checkForUpdates
  }
}