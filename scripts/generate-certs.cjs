const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Função para obter IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const int of interfaces[name]) {
      const { address, family, internal } = int;
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return '192.168.1.100'; // fallback
}

const localIP = getLocalIP();
const certsDir = './certificates';

// Criar diretório se não existir
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

console.log('🔐 Gerando certificados SSL locais...');
console.log(`📍 IP local detectado: ${localIP}`);

try {
  // Verificar se mkcert está instalado
  try {
    execSync('mkcert -version', { stdio: 'ignore' });
  } catch (error) {
    console.log('❌ mkcert não encontrado. Instalando...');
    
    if (process.platform === 'win32') {
      console.log('Windows: Instale o mkcert manualmente:');
      console.log('1. Baixe de: https://github.com/FiloSottile/mkcert/releases');
      console.log('2. Adicione ao PATH');
      console.log('3. Execute: mkcert -install');
    } else if (process.platform === 'darwin') {
      execSync('brew install mkcert', { stdio: 'inherit' });
    } else {
      console.log('Linux: Instale o mkcert:');
      console.log('curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"');
      console.log('chmod +x mkcert-v*-linux-amd64');
      console.log('sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert');
    }
    process.exit(1);
  }

  // Instalar CA local
  execSync('mkcert -install', { stdio: 'inherit' });

  // Gerar certificados
  const certCommand = `mkcert -key-file ${certsDir}/localhost-key.pem -cert-file ${certsDir}/localhost.pem localhost 127.0.0.1 ${localIP}`;
  execSync(certCommand, { stdio: 'inherit' });

  console.log('✅ Certificados gerados com sucesso!');
  console.log('🌐 Agora você pode acessar:');
  console.log(`   https://localhost:3000`);
  console.log(`   https://${localIP}:3000`);
  console.log('');
  console.log('🔒 PWA funcionará em ambos os endereços!');

} catch (error) {
  console.error('❌ Erro ao gerar certificados:', error.message);
  console.log('');
  console.log('💡 Alternativa: Use ngrok ou cloudflare tunnel');
}

// Criar .gitignore para certificados
const gitignoreContent = `
# Certificados SSL locais
certificates/
*.pem
*.key
*.crt
`;

const gitignorePath = './.gitignore';
if (fs.existsSync(gitignorePath)) {
  const existing = fs.readFileSync(gitignorePath, 'utf8');
  if (!existing.includes('certificates/')) {
    fs.appendFileSync(gitignorePath, gitignoreContent);
  }
} else {
  fs.writeFileSync(gitignorePath, gitignoreContent);
}