document.addEventListener("DOMContentLoaded", () => {
    // Заглушка — можно подключить API курсов валют
    document.getElementById("usd-rate").textContent = "92.50";
    document.getElementById("eur-rate").textContent = "100.30";
});

// Функция для выбора предложенной карты
function selectPreset(type) {
    const card = document.getElementById("customCard");
    const cardText = document.getElementById("cardText");
    const cardImage = document.getElementById("cardImage");

    if (type === "standard") {
        card.style.background = "linear-gradient(45deg, #00FF66, #004400)";
        cardText.textContent = "Стандартная карта";
        cardImage.src = "";
    } else if (type === "premium") {
        card.style.background = "linear-gradient(45deg, gold, black)";
        cardText.textContent = "Премиум карта";
        cardImage.src = "";
    }
}

// Функция изменения цвета карты
function changeColor() {
    const color = document.getElementById("cardColor").value;
    document.getElementById("customCard").style.background = color;
}

// Функция изменения цвета текста
function changeTextColor() {
    const textColor = document.getElementById("textColor").value;
    document.getElementById("cardText").style.color = textColor;
}

// Функция изменения текста на карте
function changeText() {
    const text = document.getElementById("cardInput").value;
    document.getElementById("cardText").textContent = text;
}

// Функция загрузки изображения на карту
function uploadImage() {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById("cardImage").src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Функция отправки данных на сервер
function saveCard() {
    const email = document.getElementById("emailInput").value;
    if (!email) {
        alert("Введите email!");
        return;
    }

    const cardColor = document.getElementById("cardColor").value;
    const textColor = document.getElementById("textColor").value;
    const cardText = document.getElementById("cardInput").value;
    const cardImage = document.getElementById("cardImage").src;

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");

    // Заливка цвета карты
    ctx.fillStyle = cardColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем изображение (если есть)
    if (cardImage) {
        const img = new Image();
        img.src = cardImage;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawTextAndSend(ctx, email, canvas, textColor, cardText);
        };
    } else {
        drawTextAndSend(ctx, email, canvas, textColor, cardText);
    }
}

function drawTextAndSend(ctx, email, canvas, textColor, cardText) {
    ctx.fillStyle = textColor;
    ctx.font = "22px Arial";
    ctx.fillText(cardText, 20, 100);

    const imageData = canvas.toDataURL("image/png");
    sendEmail(email, imageData);
}

function sendEmail(email, imageData) {
    alert(`Карта отправлена на ${email}!`);
    console.log(`Отправлено на ${email}: ${imageData}`);
}