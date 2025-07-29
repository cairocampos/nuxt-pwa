// export default defineNuxtPlugin((nuxtApp) => {
//   const scripts = document.querySelectorAll("script");
//   scripts.forEach((script) => {
//     if (script.innerHTML.trim()) {
//       // Verifica se o script é inline (não tem 'src')
//       script.setAttribute("nonce", "NGINX_CSP_NONCE");
//     }
//   });
// });
