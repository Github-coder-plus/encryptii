#  Improrted code made by Github-Coder-plus 
#  Code made over 3 months of testing

import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305

# ===== AES (GCM) =====
def encrypt_aes(plaintext_bytes, key_size=32):
    key = os.urandom(key_size)  # 16 bytes = AES-128, 32 bytes = AES-256
    nonce = os.urandom(12)
    cipher = Cipher(algorithms.AES(key), modes.GCM(nonce), backend=default_backend())
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(plaintext_bytes) + encryptor.finalize()
    return nonce + encryptor.tag + ciphertext, key

def decrypt_aes(ciphertext_bytes, key):
    nonce = ciphertext_bytes[:12]
    tag = ciphertext_bytes[12:28]
    ciphertext = ciphertext_bytes[28:]
    cipher = Cipher(algorithms.AES(key), modes.GCM(nonce, tag), backend=default_backend())
    decryptor = cipher.decryptor()
    return decryptor.update(ciphertext) + decryptor.finalize()

# ===== ChaCha20-Poly1305 =====
def encrypt_chacha(plaintext_bytes):
    key = ChaCha20Poly1305.generate_key()
    nonce = os.urandom(12)
    chacha = ChaCha20Poly1305(key)
    ciphertext = chacha.encrypt(nonce, plaintext_bytes, None)
    return nonce + ciphertext, key

def decrypt_chacha(ciphertext_bytes, key):
    nonce = ciphertext_bytes[:12]
    ciphertext = ciphertext_bytes[12:]
    chacha = ChaCha20Poly1305(key)
    return chacha.decrypt(nonce, ciphertext, None)

# ===== Unified File-Based Interface =====
def encrypt_file(input_path, output_path, algorithm="AES-256"):
    with open(input_path, "rb") as f:
        data = f.read()

    if algorithm == "AES-128":
        ciphertext, key = encrypt_aes(data, key_size=16)
    elif algorithm == "AES-256":
        ciphertext, key = encrypt_aes(data, key_size=32)
    elif algorithm == "ChaCha20":
        ciphertext, key = encrypt_chacha(data)
    else:
        raise ValueError("Unsupported algorithm")

    with open(output_path, "wb") as f:
        f.write(ciphertext)
    
    return key

def decrypt_file(input_path, key, algorithm="AES-256"):
    with open(input_path, "rb") as f:
        ciphertext = f.read()
    
    if algorithm == "AES-128" or algorithm == "AES-256":
        return decrypt_aes(ciphertext, key)
    elif algorithm == "ChaCha20":
        return decrypt_chacha(ciphertext, key)
    else:
        raise ValueError("Unsupported algorithm")

# ===== Temporary Test =====
#if __name__ == "__main__":
    #test_data = b"Hello, Encryptii!"
    #test_file = "test.txt"
    #enc_file = "test.enc"
    
    # Write test file
    #with open(test_file, "wb") as f:
        #f.write(test_data)

    # Test AES-128
    #key = encrypt_file(test_file, enc_file, algorithm="AES-128")
    #decrypted = decrypt_file(enc_file, key, algorithm="AES-128")
    #print("AES-128 Decrypted:", decrypted)

    # Test AES-256
    #key = encrypt_file(test_file, enc_file, algorithm="AES-256")
    #decrypted = decrypt_file(enc_file, key, algorithm="AES-256")
    #print("AES-256 Decrypted:", decrypted)

    # Test ChaCha20
    #key = encrypt_file(test_file, enc_file, algorithm="ChaCha20")
    #decrypted = decrypt_file(enc_file, key, algorithm="ChaCha20")
    #print("ChaCha20 Decrypted:", decrypted)

