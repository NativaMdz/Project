"use strict";


/* =========================================================
   ELEMENTOS
========================================================= */

const form =
    document.getElementById("letterForm");

const nameInput =
    document.getElementById("name");

const messageInput =
    document.getElementById("message");

const counter =
    document.getElementById("counter");

const sendButton =
    document.getElementById("sendButton");

const buttonLabel =
    sendButton.querySelector(".button-label");

const successOverlay =
    document.getElementById("successOverlay");

const closeSuccess =
    document.getElementById("closeSuccess");


/* =========================================================
   DETECÇÃO DE PERFORMANCE
========================================================= */

function detectPerformance() {

    const cores =
        navigator.hardwareConcurrency || 8;

    const memory =
        navigator.deviceMemory || 8;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
        Alguns celulares possuem
        pouca memória ou poucos núcleos.

        Nesses casos removemos somente
        os efeitos mais pesados.
    */

    if (
        cores <= 4 ||
        memory <= 4 ||
        reducedMotion
    ) {

        document.documentElement
            .classList.add("low-performance");

    }

}


/* =========================================================
   CONTADOR
========================================================= */

function updateCounter() {

    counter.textContent =
        messageInput.value.length;

}


messageInput.addEventListener(
    "input",
    updateCounter,
    {
        passive: true
    }
);


/* =========================================================
   MODAL
========================================================= */

function openSuccess() {

    successOverlay.classList.add(
        "active"
    );

    successOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeSuccessModal() {

    successOverlay.classList.remove(
        "active"
    );

    successOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   ENVIO
========================================================= */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            nameInput.value.trim();

        const message =
            messageInput.value.trim();


        if (
            !name ||
            !message
        ) {

            return;

        }


        sendButton.disabled =
            true;

        buttonLabel.textContent =
            "Enviando...";


        /*
            Simulação.

            Depois podemos conectar
            isso ao Firebase.
        */

        window.setTimeout(
            function() {

                buttonLabel.textContent =
                    "Enviada ✓";

                openSuccess();


                form.reset();

                updateCounter();


                window.setTimeout(
                    function() {

                        sendButton.disabled =
                            false;

                        buttonLabel.textContent =
                            "Enviar carta";

                    },
                    350
                );

            },
            450
        );

    }
);


/* =========================================================
   FECHAR MODAL
========================================================= */

closeSuccess.addEventListener(
    "click",
    closeSuccessModal
);


successOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            successOverlay
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

detectPerformance();

updateCounter();
