<template>
  <div v-if="showInstallPrompt" class="pwa-install-prompt">
    <div class="prompt-content">
      <h3>Instalar App</h3>
      <p>Instale nossa aplicação para uma melhor experiência!</p>
      <div class="prompt-buttons">
        <button @click="installPWA" class="install-btn">
          Instalar
        </button>
        <button @click="dismissPrompt" class="dismiss-btn">
          Agora não
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp()

const showInstallPrompt = ref(false)
const deferredPrompt = ref<any>(null)

// Detectar se PWA pode ser instalada
onMounted(() => {
  // Escutar evento beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallPrompt.value = true
  })

  // Verificar se já está instalada
  if (window.matchMedia('(display-mode: standalone)').matches) {
    showInstallPrompt.value = false
  }
})

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA instalada')
    }
    
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  deferredPrompt.value = null
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-width: 350px;
  z-index: 1000;
}

.prompt-content h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.prompt-content p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
}

.prompt-buttons {
  display: flex;
  gap: 10px;
}

.install-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.dismiss-btn {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.install-btn:hover {
  background: #0056b3;
}

.dismiss-btn:hover {
  background: #e9ecef;
}
</style>