const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");

qrCodeBtn.addEventListener("click", () => {
    generateQRCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission       
        generateQRCode();
    }
});

function generateQRCode() {
    const qrCodeValue = qrCodeInput.value.trim();
    if (!qrCodeValue) return;
    qrCodeBtn.innerText = "Gerando QR Code..."; 

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeValue)}`;
    
    qrCodeImg.addEventListener("load", () => {
        container.classList.add("active");
        qrCodeBtn.innerText = "Código Criado";
    });
}

qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeImg.src = "";
        qrCodeBtn.innerText = "Gerar outro QR Code";
    }
 });