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
const socialEngineeringQuizHTML = `
    <h2>Social Engineering Protection</h2>
    <p>
        Encryptii includes a Social Engineering Protection overlay system.
        It highlights risky interactions in your OS by displaying warnings
        when you click or hover over suspicious UI elements.
    </p>

    <h3>How It Helps</h3>
    <ul>
        <li>Warns you when a link, prompt, or popup looks suspicious</li>
        <li>Recognizes patterns commonly used in phishing attacks</li>
        <li>Reduces accidental clicks on malicious actions</li>
    </ul>

    <p>
        This demo shows a simplified version of that behavior.  
        <strong>Note:</strong> The full version is customizable.  
        See Docs → Social Engineering for configuration details.
    </p>

    <button id="demo-social-eng">Show Demo</button>
`;



// Business quiz logic

// ===============================
// Terminal Utilities
// ===============================
// Append messages to #terminal-messages only
function terminalAppend(msg, type="info") {
    const container = document.getElementById("terminal-messages");
    const p = document.createElement("p");

    if(type==="error") p.className="log-error";
    else if(type==="success") p.className="log-success";
    else p.className="log-info";

    p.textContent = msg;
    container.appendChild(p);
    container.scrollTop = container.scrollHeight;
}

// Clear only messages, not buttons
function terminalClear() {
    const container = document.getElementById("terminal-messages");
    container.innerHTML = `<p class="log-info">Terminal cleared.</p>`;
    document.getElementById("terminal-buttons").innerHTML = ""; // clear old buttons if needed

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

    // Clear only the messages, not the buttons container
    const messagesDiv = document.getElementById("terminal-messages");
    messagesDiv.innerHTML = ""; 
    terminalAppend(q.q);

    const buttonsDiv = document.getElementById("terminal-buttons");
    buttonsDiv.innerHTML = ""; // remove previous question buttons

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
            quizAnswers.push(opt[0]); // Lock answer: A/B/C/D
            terminalAppend(`Answer recorded: ${opt[0]}`, "success");

            quizIndex++;
            if (quizIndex < businessQuiz.length) {
                showQuizQuestion();
            } else {
                finishBusinessQuiz();
            }
        };

        buttonsDiv.appendChild(btn);
    });
}

// ===============================
// Finish Quiz
// ===============================
function finishBusinessQuiz() {
    quizActive = false;

    // Clear any remaining buttons so they can't be clicked after quiz ends
    document.getElementById("terminal-buttons").innerHTML = "";

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


// metadata quiz logic

// ===============================
// Metadata Quiz Data
// ===============================
const metadataQuizData = [
    {
        q: "1. How sensitive is your data?",
        options: [
            "A: Public, can be freely shared",
            "B: Internal, minor confidentiality needed",
            "C: Highly sensitive, requires strict privacy"
        ]
    },
    {
        q: "2. How long must your metadata remain protected?",
        options: [
            "A: Short-term (<1 year)",
            "B: Medium-term (1–5 years)",
            "C: Long-term (>5 years)"
        ]
    },
    {
        q: "3. How many people/devices need access?",
        options: [
            "A: Few or public access",
            "B: Some restricted access",
            "C: Very limited, strictly controlled"
        ]
    },
    {
        q: "4. What is more important?",
        options: [
            "A: Convenience / speed",
            "B: Moderate protection",
            "C: Maximum metadata security"
        ]
    }
];

// ===============================
// Metadata Quiz State
// ===============================
let metadataQuizIndex = 0;
let metadataQuizAnswers = [];
let metadataQuizActive = false;

// ===============================
// Start Metadata Quiz
// ===============================
function startMetadataQuiz() {
    terminalClear();
    metadataQuizIndex = 0;
    metadataQuizAnswers = [];
    metadataQuizActive = true;
    terminalAppend("Metadata Protection Quiz started! Click a button to answer.");
    showMetadataQuestion();
}

// ===============================
// Show One Metadata Question at a Time
// ===============================
function showMetadataQuestion() {
    const q = metadataQuizData[metadataQuizIndex];

    const messagesDiv = document.getElementById("terminal-messages");
    messagesDiv.innerHTML = "";
    terminalAppend(q.q);

    const buttonsDiv = document.getElementById("terminal-buttons");
    buttonsDiv.innerHTML = "";

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
            metadataQuizAnswers.push(opt[0]); // Lock answer A/B/C
            terminalAppend(`Answer recorded: ${opt[0]}`, "success");

            metadataQuizIndex++;
            if (metadataQuizIndex < metadataQuizData.length) {
                showMetadataQuestion();
            } else {
                finishMetadataQuiz();
            }
        };

        buttonsDiv.appendChild(btn);
    });
}

// ===============================
// Finish Metadata Quiz
// ===============================
function finishMetadataQuiz() {
    metadataQuizActive = false;
    document.getElementById("terminal-buttons").innerHTML = ""; // remove buttons

    terminalAppend("Quiz complete!", "success");

    const recommendation = evaluateMetadataQuiz(metadataQuizAnswers);
    terminalAppend("Recommended Metadata Protection Level: " + recommendation, "success");

    document.getElementById("clear-terminal").classList.remove("hidden");
}

// ===============================
// Evaluate Metadata Quiz Answers
// ===============================
function evaluateMetadataQuiz(ans) {
    let weight = 0;
    ans.forEach(a => {
        if(a === "A") weight += 1;
        else if(a === "B") weight += 2;
        else if(a === "C") weight += 3;
    });

    if(weight <= 5) return "Basic Metadata Protection";
    if(weight <= 8) return "Intermediate Metadata Protection";
    return "Advanced Metadata Protection";
}

// ===============================
// Load Left Panel & Bind Metadata Quiz Start
// ===============================
document.getElementById("btn-quiz-metadata").onclick = () => {
    loadLeftPanel(`
        <h2>Metadata Protection Quiz</h2>
        <p>Determine which level of metadata protection your organization requires. Click the button below to start the quiz.</p>
        <button id="start-metadata-quiz">Start Quiz</button>
    `);

    // Bind start button after it exists
    setTimeout(() => {
        const startBtn = document.getElementById("start-metadata-quiz");
        if(startBtn) startBtn.onclick = startMetadataQuiz;
    }, 0);
};


// individual encryption

document.getElementById("btn-encryption").onclick = () => {
    loadLeftPanel(`
        <h2>Individual Encryption</h2>
        <p>Choose one of these three secure encryption systems based on your needs:</p>
        <ul>
            <li><strong>AES-GCM-128:</strong> Fast and secure for general use.</li>
            <li><strong>AES-GCM-256:</strong> Stronger security for sensitive files.</li>
            <li><strong>ChaCha20-Poly1305:</strong> High performance on mobile devices.</li>
        </ul>
        <p><strong>Encrypt a file:</strong></p>
        <input type="file" id="file-upload-individual">
        <div id="individual-buttons"></div>

        <hr style="margin:1rem 0; border-color:#22c55e;">

        <p><strong>Decrypt a file:</strong></p>
        <input type="file" id="file-upload-decrypt">
        <input type="text" id="key-input" placeholder="Enter key in hex" style="margin-top:0.5rem;">
        <select id="algorithm-select" style="margin-top:0.5rem;">
            <option value="aes-128">AES-GCM-128</option>
            <option value="aes-256">AES-GCM-256</option>
            <option value="chacha20">ChaCha20-Poly1305</option>
        </select>
        <button id="decrypt-button" style="margin-top:0.5rem; border-radius:50px; border:2px solid #22c55e; background:#202020; color:#f9fafb; cursor:pointer; padding:0.5rem 1rem;">Decrypt</button>
    `);

    // ===== Encryption Buttons =====
    const container = document.getElementById("individual-buttons");
    container.innerHTML = "";

    ["AES-GCM-128", "AES-GCM-256", "ChaCha20-Poly1305"].forEach(enc => {
        const btn = document.createElement("button");
        btn.textContent = enc;
        btn.style.margin = "0.25rem";
        btn.style.borderRadius = "50px";
        btn.style.border = "2px solid #22c55e";
        btn.style.backgroundColor = "#202020";
        btn.style.color = "#f9fafb";
        btn.style.cursor = "pointer";
        btn.style.padding = "0.5rem 1rem";

        btn.onclick = async () => {
            const fileInput = document.getElementById("file-upload-individual");
            if (!fileInput.files.length) {
                terminalAppend("Please select a file first.", "error");
                return;
            }

            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("file", file);

            // Map frontend names to backend algorithm names
            let algo = "";
            if (enc === "AES-GCM-128") algo = "aes-128";
            else if (enc === "AES-GCM-256") algo = "aes-256";
            else if (enc === "ChaCha20-Poly1305") algo = "chacha20";

            formData.append("algorithm", algo);

            terminalAppend(`Uploading file and encrypting using ${enc}...`, "info");

            try {
                const res = await fetch("/encrypt", { method: "POST", body: formData });
                if (!res.ok) {
                    const err = await res.json();
                    terminalAppend(`Error: ${err.error}`, "error");
                    return;
                }

                const blob = await res.blob();
                const key = res.headers.get("X-Key");
                const alg = res.headers.get("X-Algorithm");

                // Download encrypted file
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = file.name + ".enc";
                a.click();
                URL.revokeObjectURL(downloadUrl);

                terminalAppend(`Encryption complete! Algorithm: ${alg}, Key: ${key}`, "success");
                document.getElementById("clear-terminal").classList.remove("hidden");

            } catch (err) {
                terminalAppend("Encryption failed: " + err.message, "error");
            }
        };

        container.appendChild(btn);
    });

    // ===== Decrypt Button =====
    document.getElementById("decrypt-button").onclick = async () => {
        const fileInput = document.getElementById("file-upload-decrypt");
        const keyHex = document.getElementById("key-input").value.trim();
        const algorithm = document.getElementById("algorithm-select").value;

        if (!fileInput.files.length) {
            terminalAppend("Please select a file to decrypt.", "error");
            return;
        }
        if (!keyHex) {
            terminalAppend("Please enter the decryption key.", "error");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("key", keyHex);
        formData.append("algorithm", algorithm);

        terminalAppend(`Decrypting file using ${algorithm}...`, "info");

        try {
            const res = await fetch("/decrypt", { method: "POST", body: formData });
            if (!res.ok) {
                const err = await res.json();
                terminalAppend(`Error: ${err.error}`, "error");
                return;
            }

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = file.name.replace(/\.enc$/i, "_decrypted");
            a.click();
            URL.revokeObjectURL(downloadUrl);

            terminalAppend(`Decryption complete!`, "success");
            document.getElementById("clear-terminal").classList.remove("hidden");

        } catch (err) {
            terminalAppend("Decryption failed: " + err.message, "error");
        }
    };
};
// social engenerring demo

// ===============================
// Social Engineering Demo Logic
// ===============================
function startSocialDemo() {
    terminalClear();
    terminalAppend("Social Engineering Demo Started!", "success");
    terminalAppend("This is a simplified simulation of how Encryptii warns you about suspicious UI actions.");
    terminalAppend("Click any simulated OS action below:");

    const buttonsDiv = document.getElementById("terminal-buttons");
    buttonsDiv.innerHTML = "";

    const actions = [
        { label: "Open 'Important_Document.pdf'", safe: true },
        { label: "Run unknown .exe from email", safe: false },
        { label: "Enter password into popup", safe: false },
        { label: "Visit secure settings", safe: true },
        { label: "Click shortened suspicious link", safe: false }
    ];

    actions.forEach(action => {
        const btn = document.createElement("button");
        btn.textContent = action.label;
        btn.style.margin = "0.25rem";
        btn.style.borderRadius = "50px";
        btn.style.border = "2px solid #22c55e";
        btn.style.backgroundColor = "#202020";
        btn.style.color = "#f9fafb";
        btn.style.cursor = "pointer";
        btn.style.padding = "0.5rem 1rem";

        btn.onclick = () => {
            if (action.safe) {
                terminalAppend(`Action: ${action.label}`, "success");
                terminalAppend("No suspicious behavior detected.");
            } else {
                terminalAppend(`Action: ${action.label}`, "error");
                terminalAppend("⚠ WARNING: This action resembles a common social engineering trick.");
                terminalAppend("Proceed with caution or verify the source before continuing.");
            }
        };

        buttonsDiv.appendChild(btn);
    });
}

document.getElementById("btn-social").onclick = () => {
    loadLeftPanel(socialEngineeringQuizHTML);

    setTimeout(() => {
        const demoBtn = document.getElementById("demo-social-eng");
        if (demoBtn) demoBtn.onclick = () => startSocialDemo();
    }, 0);
};
// docs

document.getElementById("btn-docs").onclick = () => {
    loadLeftPanel(`
        <h2>Documentation</h2>
        <p>For full setup instructions, usage, and customization, visit our GitHub documentation.</p>
        <button id="open-docs" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            border: 2px solid #22c55e;
            background-color: #202020;
            color: #f9fafb;
            cursor: pointer;
            font-weight: 600;
        ">Open Docs</button>
    `);

    // Bind click after button exists
    setTimeout(() => {
        const openBtn = document.getElementById("open-docs");
        if(openBtn) openBtn.onclick = () => {
            window.open("https://github.com/YOUR_USERNAME/YOUR_REPO/blob/main/README.md", "_blank");
        };
    }, 0);
};
