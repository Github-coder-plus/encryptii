// Main UI initialization
document.addEventListener("DOMContentLoaded", () => {
    console.log("Frontend loaded");

    // Example: simple terminal echo
    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const text = input.value.trim();
            if (text.length > 0) {
                appendToTerminal(`> ${text}`);
            }
            input.value = "";
        }
    });

    function appendToTerminal(msg) {
        const line = document.createElement("div");
        line.className = "terminal-line";
        line.textContent = msg;
        output.appendChild(line);

        // auto-scroll
        output.scrollTop = output.scrollHeight;
    }
});

// Utility: Replace left panel content
function loadLeftPanel(html) {
    const panel = document.getElementById("left-panel");
    panel.innerHTML = html;
}

document.getElementById("btn-about").onclick = () => {
    loadLeftPanel(aboutPageHTML);
};

document.getElementById("btn-encryption").onclick = () => {
    loadLeftPanel(individualEncryptionHTML);
};

document.getElementById("btn-quiz-level").onclick = () => {
    loadLeftPanel(businessEncryptionQuizHTML);
};

document.getElementById("btn-quiz-metadata").onclick = () => {
    loadLeftPanel(metadataQuizHTML);
};

document.getElementById("btn-social").onclick = () => {
    loadLeftPanel(socialEngineeringQuizHTML);
};




const aboutPageHTML = `
    <h2>About Encryptii</h2>
    <p>Encryptii is a modern encryption platform designed to help individuals and businesses protect their digital assets with clarity and speed.</p>

    <h3>Core Capabilities</h3>
    <ul>
        <li>Local AES-256 file encryption</li>
        <li>Business-oriented encryption recommendations</li>
        <li>Metadata protection analysis</li>
        <li>Social engineering defense training</li>
    </ul>

    <h3>Our Mission</h3>
    <p>To make strong encryption accessible, intuitive, and adaptable to real-world security needs—without requiring technical knowledge.</p>

    <h3>How It Works</h3>
    <p>Encryptii runs locally in your browser and communicates with a secure Python backend to process encryption tasks. No user files or keys are stored.</p>

    <h3>Alpha Notice</h3>
    <p>This is an early release of Encryptii intended for testing core functionality, UI flow, and quizzes. Performance and UX will continue improving.</p>
`;
const individualEncryptionHTML = `<h2>Individual Encryption</h2><p>Coming soon.</p>`;
const businessEncryptionQuizHTML = `
<h2>Business Encryption Quiz</h2>
<p>Test your business encryption knowledge. Click the button below to start the quiz.</p>
<button id="start-business-quiz">Start Quiz</button>
`;
const metadataQuizHTML = `<h2>Metadata Protection</h2><p>Coming soon.</p>`;
const socialEngineeringQuizHTML = `<h2>Social Engineering</h2><p>Coming soon.</p>`;
