# Encryptii

Encryptii is an adaptive, user-friendly encryption toolkit designed to protect files at rest and in transit while minimizing metadata leakage and performance impact. It pairs secure defaults with an easy quiz-based workflow that recommends encryption and metadata-protection profiles for personal users and businesses. This beta implements the core encryption engine and Level-1 metadata protections; additional advanced protections are planned.

---

## ✨ Key Goals

- Provide strong, practical encryption that’s easy to use.
- Reduce metadata leakage (file names, sizes, timing, structure) with pragmatic features.
- Offer adaptive encryption profiles so protection matches use-case constraints (e.g., low-latency gaming vs. archival storage).
- Demonstrate social-engineering prevention through UI warnings and role-based examples.

---

## 🧩 Technologies

- Frontend: Plain **HTML**, **CSS**, **JavaScript** (static)
- Backend: **Python** (encryption engine)
- Python libraries (might not use all of them): `cryptography`, `Flask` or `FastAPI`
- Packaging / distribution: `PyInstaller` (optional for desktop beta)

---

## 🚀 Beta Features (What works now)

- AES-GCM encryption/decryption for files (AES-256-GCM default)
- Lightweight / Standard encryption modes (toggleable)
- `.encpkg` container format (encrypted header with encrypted filename)
- Small padding for tiny files (Level-1 metadata protection)
- Quiz system that maps user answers to a profile:
  - Metadata sensitivity
  - At-rest vs in-transit preference
  - Performance sensitivity
  - Role (Admin / User / Developer)
- Social-engineering **demo** UI (preview pop-ups and role-based warnings)
- Clear placeholders for planned features (with explanations)

---

## ❗ Beta Limitations (what is intentionally omitted)

The following are **not** included in this beta release and will be added in later versions:

- HSM integration and enterprise key vaults
- Network-level traffic shaping, VPN/multi-hop transfers
- Real-time social-engineering detection/AI
- Key rotation, automated revocation workflows
- Full metadata protection Level 2 / 3 (advanced traffic obfuscation)

Clicking these areas in the UI shows a clear, professional placeholder message explaining the missing functionality and planned timeline.

---

## 🔐 Security & Design Notes

- Uses authenticated encryption (AEAD) to prevent tampering and provide integrity.
- Keys are derived/stored using secure KDF and encrypted local storage in the beta.
- Default modes favor safe parameters; users can select lighter profiles when performance is critical.
- This beta is intended for evaluation and demonstration. Do not rely on the beta for production-critical secrets until upgrades (HSM/key lifecycle and audited code) are implemented.

---

## 🧪 Example Encrypt/Decrypt CLI (for testing)
(not sure if this works)
``` python
python -c "from backend.encrypt import encrypt_file; encrypt_file('test.txt','test.encpkg','mypassword')"
python -c "from backend.encrypt import decrypt_file; decrypt_file('test.encpkg','out.txt','mypassword')"
```

(Implementations included in backend/encrypt.py)

---

## 🛣 Roadmap (Near Term)

- Improve key lifecycle: encrypted vault + passphrase recovery
- Add ChaCha20-Poly1305 and algorithm selection for performance-sensitive flows
- Implement Level-2 metadata protections: uniform padding, batching
- Add secure server-to-server transfer demo
- HSM / cloud KMS integration (enterprise module)
- Automated tests and third-party security audit

---

## 📄 License

This project is released under the BSD 3-Clause License. See LICENSE for details.

---

## 🤝 Contributing

- Open an issue for bugs or feature requests
- Use small PRs focused on one change
- Document important security implications when changing crypto logic
- Do **not** change cryptographic primitives without review

---

## ✉️ Contact / Feedback

To test, collaborate, or audit the encryption engine:
- Open an issue or DM me at (filler)

---

## Acknowledgements

Built as a focused, pragmatic beta to demonstrate adaptive encryption and metadata protection patterns. Inspired by best practices in applied cryptography and privacy engineering.
