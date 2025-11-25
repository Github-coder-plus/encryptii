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

