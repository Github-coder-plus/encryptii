# Encryptii • Alpha Documentation

> **Note:** This is an Alpha release intended for testing core functionality, UI flow, and quizzes. Performance, features, and UX will continue improving.

---

## 1. Overview
Encryptii is a modern encryption platform designed to help individuals and businesses protect their digital assets.  

**Key Goals:**
- Make strong encryption accessible and intuitive.  
- Provide business-focused encryption recommendations.  
- Offer metadata protection analysis.  
- Raise awareness of social engineering threats.

---

## 2. Features

### Individual Encryption
- AES-128 (GCM)  
- AES-256 (GCM)  
- ChaCha20-Poly1305  

> Users can upload files and select an algorithm to encrypt. A decryption key is provided with the output.

### Business Encryption Quiz
- Evaluates your organization's data type, retention needs, device usage, and priority (speed vs. strength).  
- Recommends an encryption system based on quiz results.

### Metadata Protection Quiz
- Assesses sensitivity and accessibility of metadata.  
- Suggests a protection level (Basic, Intermediate, Advanced).

### Social Engineering Demo
- Shows a simulated UI with common social engineering actions.  
- Clicking an action triggers a pop-up indicating a potential trick.  
- Users can explore the vision without fully implementing the overlay.

### Terminal Panel
- Central interface for quizzes, outputs, and demos.  
- Includes "Clear Terminal" functionality to reset messages.

---

## 3. Installation & Hosting

**Requirements:**
- Python 3.x  
- Flask  
- `cryptography` Python library  

**Local Run:**
```bash
git clone <repo-url>
cd encryptii
python app.py
```
### Notes:

Files uploaded are stored in the uploads/ folder.

Ensure folder permissions allow reading/writing.

### Deployment:

Recommended: Render, Heroku, or any Python/Flask hosting service.

The app.py exposes /encrypt and /decrypt endpoints for integration.

## 4. Usage
### Encrypt a File
- Click Individual Encryption in the top bar.

- Upload your file in the left panel.

- Choose an algorithm (AES-128, AES-256, ChaCha20).

- Download the encrypted file and save the decryption key.

### Take a Quiz
- Click Business Encryption or Metadata Protection.

- Answer the questions displayed in the terminal panel.

- Receive recommendations based on your answers.

- Use the Clear Terminal button to reset the interface.

### Social Engineering Demo
- Click Social Engineering.

- Read the description of the demo.

- Click Show Demo to interact with the terminal-based simulation.

- Explore potential trick actions and warnings.

## 5. Security Notes
- Keys are generated per file/session and are not stored on the server.

- Uploaded files are temporary; no data is retained.

- Always store decryption keys securely.

- Avoid testing with real sensitive data in Alpha.

## 6. Customization
Encryption Algorithms: Modify encrypt.py to add or change algorithms.

Social Engineering Demo: Update the demo logic in script.js to add new UI actions or pop-ups.

Styling: Update style.css for custom colors, shapes, and layout.

Quizzes: Extend quiz data arrays in script.js for more questions or options.

## 7. Troubleshooting / FAQ
Error: "No file provided" → Ensure a file is uploaded before submission.

Decryption fails → Verify the correct algorithm and key are used.

Quiz not starting → Refresh the page and click the Start Quiz button again.

Terminal panel not displaying messages → Ensure JavaScript is enabled and the console has no errors.

For further issues or suggestions, please submit an issue on the GitHub repository.
