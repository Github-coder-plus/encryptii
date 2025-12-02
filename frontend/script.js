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

    setTimeout(() => {
        const startBtn = document.getElementById("start-business-quiz");
        if(startBtn) startBtn.onclick = () => startBusinessQuiz();
    }, 0);
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


// Business quiz logic

// ===============================
// Terminal Utilities
// ===============================
function terminalAppend(msg, type = "info") {
    const panel = document.getElementById("terminal-panel");
    const p = document.createElement("p");

    if (type === "error") p.className = "log-error";
    else if (type === "success") p.className = "log-success";
    else p.className = "log-info";

    p.textContent = msg;
    panel.appendChild(p);
    panel.scrollTop = panel.scrollHeight;
}

function terminalClear() {
    const panel = document.getElementById("terminal-panel");
    panel.innerHTML = `<p class="log-info">Terminal cleared.</p>`;
    document.getElementById("clear-terminal").classList.add("hidden");
}

// ===============================
// Clear Terminal Button
// ===============================
document.getElementById("clear-terminal").onclick = () => {
    terminalClear();
};

// ===============================
// Business Quiz Data
// ===============================
const businessQuiz = [
    {
        q: "1. What type of data does your business store?",
        options: ["A: Non-sensitive", "B: Internal docs", "C: Financial/PII", "D: High-security sensitive"]
    },
    {
        q: "2. How long must your encrypted data remain secure?",
        options: ["A: <3 yrs", "B: 3–10 yrs", "C: 10+ yrs", "D: Must resist future attacks"]
    },
    {
        q: "3. What device types do employees primarily use?",
        options: ["A: Consumer laptops/phones", "B: Modern computers", "C: Enterprise hardware", "D: Unknown hardware"]
    },
    {
        q: "4. What is more important?",
        options: ["A: Speed", "B: Strong encryption", "C: Maximum strength", "D: Long-term confidentiality"]
    }
];

// ===============================
// Quiz State
// ===============================
let quizIndex = 0;
let quizAnswers = [];
let quizActive = false;

// ===============================
// Start Quiz
// ===============================
function startBusinessQuiz() {
    terminalClear(); // Fix: clear terminal at start
    quizIndex = 0;
    quizAnswers = [];
    quizActive = true;
    terminalAppend("Business Encryption Quiz started! Click a button to answer.");
    showQuizQuestion();
}

// ===============================
// Show One Question at a Time
// ===============================
function showQuizQuestion() {
    const q = businessQuiz[quizIndex];
    terminalClear(); // show only current question
    terminalAppend(q.q);

    const panel = document.getElementById("terminal-panel");

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.style.margin = "0.25rem";
        btn.style.borderRadius = "50px";
        btn.style.border = "2px solid #22c55e";
        btn.style.backgroundColor = "#202020";
        btn.style.color = "#f9fafb";
        btn.style.cursor = "pointer";
        btn.style.padding = "0.5rem 1rem";
        btn.onclick = () => {
            // Lock answer immediately
            quizAnswers.push(opt[0]); // A/B/C/D
            terminalAppend(`Answer recorded: ${opt[0]}`, "success");

            quizIndex++;
            if (quizIndex < businessQuiz.length) {
                showQuizQuestion();
            } else {
                finishBusinessQuiz();
            }
        };
        panel.appendChild(btn);
    });
}

// ===============================
// Finish Quiz
// ===============================
function finishBusinessQuiz() {
    quizActive = false;
    terminalAppend("Quiz complete!", "success");

    const recommendation = evaluateBusinessQuiz(quizAnswers);
    terminalAppend("Recommended Encryption: " + recommendation, "success");

    document.getElementById("clear-terminal").classList.remove("hidden");
}

// ===============================
// Evaluate Answers
// ===============================
function evaluateBusinessQuiz(ans) {
    let weight = 0;
    ans.forEach(a => { 
        if(a==="A") weight+=1; 
        else if(a==="B") weight+=2; 
        else if(a==="C") weight+=3; 
        else if(a==="D") weight+=4; 
    });

    if(weight <= 6) return "AES-128 (sufficient)";
    if(weight <= 10) return "AES-256 (recommended)";
    if(weight <= 13) return "ChaCha20-Poly1305 (mobile preference)";
    return "AES-256 + metadata hardening (high-security tier)";
}

// ===============================
// Load Left Panel & Bind Start Button
// ===============================
document.getElementById("btn-quiz-level").onclick = () => {
    loadLeftPanel(`
        <h2>Business Encryption Quiz</h2>
        <p>Test your business encryption knowledge. Click the button below to start the quiz.</p>
        <button id="start-business-quiz">Start Quiz</button>
    `);

    // Bind the Start Quiz button AFTER it exists in DOM
    setTimeout(() => {
        const startBtn = document.getElementById("start-business-quiz");
        if(startBtn) startBtn.onclick = startBusinessQuiz;
    }, 0);
};
