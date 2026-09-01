const form = document.getElementById("letterForm");

const message = document.getElementById("message");
const counter = document.getElementById("counter");

const successOverlay = document.getElementById("successOverlay");
const closeSuccess = document.getElementById("closeSuccess");


// ========================================
// CONTADOR DA CARTA
// ========================================

message.addEventListener("input", () => {
    counter.textContent = message.value.length;
});


// ========================================
// ENVIO
// ========================================

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const text = message.value.trim();

    if (!name || !text) {
        return;
    }

    // Pequena simulação de envio
    const button = form.querySelector(".send-button");
    const buttonText = button.querySelector("span");

    buttonText.textContent = "Enviando...";

    button.disabled = true;

    setTimeout(() => {

        buttonText.textContent = "Enviada ✓";

        successOverlay.classList.add("active");

        button.disabled = false;

        form.reset();

        counter.textContent = "0";

    }, 650);

});


// ========================================
// FECHAR MODAL
// ========================================

closeSuccess.addEventListener("click", () => {
    successOverlay.classList.remove("active");
});


// Fecha clicando fora
successOverlay.addEventListener("click", (event) => {

    if (event.target === successOverlay) {
        successOverlay.classList.remove("active");
    }

});


// ========================================
// ESC
// ========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        successOverlay.classList.remove("active");
    }

});