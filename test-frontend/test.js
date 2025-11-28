// ===== ENCRYPT =====
async function encryptFile(file, algorithm) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("algorithm", algorithm);

    const response = await fetch("http://localhost:5000/encrypt", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const err = await response.json();
        alert("Encryption error: " + err.error);
        return;
    }

    const key = response.headers.get("X-Key");
    const usedAlgorithm = response.headers.get("X-Algorithm");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name + ".enc";
    a.click();

    document.getElementById("output").innerText =
        `Encrypted with ${usedAlgorithm}. Key: ${key}`;
}

// ===== DECRYPT =====
async function decryptFile(file, key, algorithm) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", key);
    formData.append("algorithm", algorithm);

    const response = await fetch("http://localhost:5000/decrypt", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const err = await response.json();
        alert("Decryption error: " + err.error + "\n" + (err.details || ""));
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "decrypted_output";
    a.click();

    document.getElementById("output").innerText =
        `Decryption complete with ${algorithm}`;
}

// ===== Event Listeners =====
document.getElementById("encryptBtn").addEventListener("click", () => {
    const file = document.getElementById("fileInput").files[0];
    const algorithm = document.getElementById("algorithm").value;
    if (!file) { alert("Select a file first"); return; }
    encryptFile(file, algorithm);
});

document.getElementById("decryptBtn").addEventListener("click", () => {
    const file = document.getElementById("fileInput").files[0];
    const key = document.getElementById("keyInput").value.trim();
    const algorithm = document.getElementById("algorithm").value;
    if (!file || !key) { alert("Select a file and enter the key"); return; }
    decryptFile(file, key, algorithm);
});
