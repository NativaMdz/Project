<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Admirador Secreto</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Fundo -->
    <div class="background">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    </div>

    <!-- Conteúdo -->
    <main class="app">

        <div class="glass-card">

            <div class="icon">
                💌
            </div>

            <span class="eyebrow">UMA MENSAGEM SECRETA</span>

            <h1>
                Envie uma carta<br>
                para seu admirador.
            </h1>

            <p class="description">
                Escreva algo especial para alguém.
                Sua identidade pode continuar em segredo.
            </p>

            <form id="letterForm">

                <div class="field">
                    <label for="name">Para quem é?</label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Nome ou apelido"
                        maxlength="40"
                        required
                    >
                </div>

                <div class="field">
                    <label for="message">Sua carta</label>

                    <textarea
                        id="message"
                        placeholder="Escreva algo que você nunca teve coragem de dizer..."
                        maxlength="500"
                        required
                    ></textarea>

                    <div class="counter">
                        <span id="counter">0</span>/500
                    </div>
                </div>

                <div class="secret-option">
                    <div>
                        <strong>Manter no anonimato</strong>
                        <small>Seu nome não será revelado.</small>
                    </div>

                    <label class="switch">
                        <input type="checkbox" checked>
                        <span></span>
                    </label>
                </div>

                <button type="submit" class="send-button">
                    <span>Enviar carta</span>
                    <span class="arrow">→</span>
                </button>

            </form>

            <div class="footer">
                Feito para sentimentos que não precisam de nome.
            </div>

        </div>

    </main>

    <!-- Modal de sucesso -->
    <div class="success-overlay" id="successOverlay">

        <div class="success-card">

            <div class="success-icon">
                ✨
            </div>

            <h2>Carta enviada.</h2>

            <p>
                Agora é só esperar.
                Talvez alguém esteja prestes a descobrir
                que existe uma pessoa pensando nela.
            </p>

            <button id="closeSuccess">
                Fechar
            </button>

        </div>

    </div>

    <script src="script.js"></script>

</body>
</html>