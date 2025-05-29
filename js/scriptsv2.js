// Encapsulamento do código em uma função autoexecutável para evitar poluição do escopo global
(() => {
  // Seleciona os elementos do DOM necessários
  const container = document.querySelector('.container');
  const qrCodeBtn = document.querySelector('#qr-form button');
  const qrCodeInput = document.querySelector('#qr-form input');
  const qrCodeImg = document.querySelector('#qr-code img');
  const QR_CODE_API = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';

  // Função para gerar o QR Code
  function handleGenerateQrCode() {
    const inputValue = qrCodeInput.value.trim(); // Pega o valor do input e remove espaços
    if (!inputValue) return; // Se estiver vazio, não faz nada
    qrCodeBtn.innerText = 'Gerando QR Code ...'; // Feedback visual ao usuário
    qrCodeImg.src = `${QR_CODE_API}${encodeURIComponent(inputValue)}`; // Define a imagem do QR Code usando a API
    qrCodeImg.onload = () => {
      container.classList.add('active'); // Mostra o QR Code na tela
      qrCodeBtn.innerText = 'Código Criado!'; // Atualiza o texto do botão
    };
    qrCodeImg.onerror = () => {
      qrCodeBtn.innerText = 'Erro ao gerar QR Code!'; // Mensagem de erro se falhar
    };
  }

  // Função para tratar o pressionamento de teclas no input
  function handleInputKeydown(e) {
    if (e.code === 'Enter') { // Se pressionar Enter
      e.preventDefault(); // Impede o envio do formulário
      handleGenerateQrCode(); // Gera o QR Code
    }
  }

  // Função para tratar quando o usuário apaga o texto do input
  function handleInputKeyup() {
    if (!qrCodeInput.value.trim()) { // Se o input estiver vazio
      container.classList.remove('active'); // Esconde o QR Code
      qrCodeBtn.innerText = 'Gerar QR Code'; // Restaura o texto do botão
    }
  }

  // Adiciona os event listeners aos elementos
  qrCodeBtn.addEventListener('click', handleGenerateQrCode); // Clique no botão
  qrCodeInput.addEventListener('keydown', handleInputKeydown); // Tecla pressionada no input
  qrCodeInput.addEventListener('keyup', handleInputKeyup); // Tecla liberada no input
})();