<template>
  <div>
    <h1>Minha PWA</h1>
    <VitePwaManifest />
    <PWAInstallPrompt />

    <button @click="testador">TEstar</button>
    <!-- Botão de atualização se disponível -->
    <div v-if="isUpdateAvailable" class="update-banner">
      <p>Nova versão disponível!</p>
      <button @click="updateServiceWorker">
        Atualizar
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePWA } from './composables/usePWA';
const { isUpdateAvailable, updateServiceWorker, testador } = usePWA()
</script>