<template>
  <div>
    <VitePwaManifest />
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <!-- <button v-if="true" @click="promptInstall">Instalar</button> -->
    
    <p v-if="$pwa?.isPWAInstalled">Instalado</p>
    <div v-else>
      <p>PWA Nao instalado</p>
      <button @click="installApp">Instalar PWA</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// const { $pwa } = useNuxtApp()
// import { usePwaInstall } from './usePwaInstall'

// const { isInstallPromptAvailable, promptInstall } = usePwaInstall()

import { ref, onMounted } from 'vue'

const { $pwa } = useNuxtApp()
const canInstall = ref(false)

// onMounted(() => {
//   if ($pwa) {
//     $pwa?.on('caninstallprompt', () => {
//       canInstall.value = true
//     })

//     $pwa?.on('installed', () => {
//       canInstall.value = false
//     })
//   }
// })

const installApp = async () => {
  if($pwa) {
    const result = await $pwa?.install()

    alert(JSON.stringify(result, null, 2))
  
    console.log({result})
  }

}



</script>
