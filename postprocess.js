import fs from "fs";
import path from "path";
import crypto from "crypto";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para gerar nonce aleatório em base64
function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

// Função para ler todos os arquivos HTML na pasta .output/public ou .output/server
function processNuxtOutput(directoryPath) {
  // Lê todos os arquivos no diretório
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao ler diretório:", err);
      return;
    }

    // Filtra apenas arquivos .html (caso Nuxt tenha gerado HTML)
    const htmlFiles = files.filter((file) => file.endsWith(".html"));

    // Processa cada arquivo HTML
    htmlFiles.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Lê o conteúdo do arquivo HTML
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Erro ao ler arquivo:", err);
          return;
        }

        // Carrega o HTML usando cheerio
        const $ = cheerio.load(data);

        // Encontra todos os <script> inline e adiciona o atributo data-nonce
        $("script").each((i, script) => {
          if (!$(script).attr("src")) {
            // Só modifica scripts inline
            const nonce = generateNonce();
            $(script).attr("nonce", "NGINX_CSP_NONCE");
          }
        });

        // Salva o arquivo modificado de volta
        fs.writeFile(filePath, $.html(), "utf8", (err) => {
          if (err) {
            console.error("Erro ao salvar arquivo:", err);
          } else {
            console.log(`Arquivo ${file} processado com sucesso!`);
          }
        });
      });
    });
  });
}

// Caminho para o diretório .output/public (ou .output/server) do Nuxt
const nuxtOutputDirectory = path.join(__dirname, ".output/public"); // Substitua por '.output/server' para SSR
processNuxtOutput(nuxtOutputDirectory);
