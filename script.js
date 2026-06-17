const passwordInput = document.getElementById("password");
const results = document.getElementById("results");
const strengthBar = document.getElementById("strength-bar");

const commonPatterns = [
    "123",
    "password",
    "qwerty",
    "admin",
    "abc",
    "111",
    "000"
];

passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {

    const password = passwordInput.value;

    let score = 0;
    let warnings = [];

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    commonPatterns.forEach(pattern => {
        if (password.toLowerCase().includes(pattern)) {
            warnings.push(`Contains common pattern: "${pattern}"`);
        }
    });

    const strengthPercent = (score / 6) * 100;

    strengthBar.style.width = strengthPercent + "%";

    let strengthText = "";
    let color = "";

    if (score <= 2) {
        strengthText = "Weak";
        color = "#ef4444";
    }
    else if (score <= 4) {
        strengthText = "Moderate";
        color = "#f59e0b";
    }
    else {
        strengthText = "Strong";
        color = "#22c55e";
    }

    strengthBar.style.background = color;

    results.innerHTML = `
        <h3>${strengthText}</h3>
        <p><strong>Score:</strong> ${score}/6</p>
        <p><strong>Estimated Crack Time:</strong> ${estimateCrackTime(score)}</p>
        <br>
        <p>${warnings.length ? warnings.join("<br>") : "No common weaknesses detected."}</p>
    `;
}

function estimateCrackTime(score) {

    switch(score) {
        case 0:
        case 1:
        case 2:
            return "Seconds";

        case 3:
            return "Hours";

        case 4:
            return "Weeks";

        case 5:
            return "Years";

        case 6:
            return "Centuries";

        default:
            return "Unknown";
    }
}

function savePassword() {

    const password = passwordInput.value;

    if (!password) {
        alert("Enter a password first.");
        return;
    }

    let history =
        JSON.parse(localStorage.getItem("passwordHistory")) || [];

    if (history.includes(password)) {
        alert("⚠️ Password reuse detected!");
        return;
    }

    history.push(password);

    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );

    alert("✓ Password saved locally.");
}

function generatePassphrase() {

    const words = [
        "Rocket",
        "Forest",
        "Tiger",
        "Ocean",
        "Castle",
        "Robot",
        "Planet",
        "Falcon",
        "Thunder",
        "Diamond"
    ];

    const randomWord =
        () => words[Math.floor(Math.random() * words.length)];

    const passphrase =
        `${randomWord()}-${randomWord()}-${randomWord()}-${Math.floor(Math.random()*1000)}`;

    document.getElementById("passphrase-box").innerHTML =
        `<strong>Suggested Passphrase:</strong><br>${passphrase}`;
}
