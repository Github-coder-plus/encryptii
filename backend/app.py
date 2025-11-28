#  Imported code made by Github-Coder-plus 
#  Code made over 3 months of testing

from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from backend.encrypt import encrypt_aes, encrypt_chacha, decrypt_aes, decrypt_chacha

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ===== Helper function to save uploaded file =====
def save_file(file):
    filename = secure_filename(file.filename)
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)
    return path

# ===== Encryption endpoints =====
@app.route('/encrypt', methods=['POST'])
def encrypt_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    algorithm = request.form.get('algorithm', 'aes-256')

    # Save uploaded file safely
    path = save_file(file)
    with open(path, 'rb') as f:
        data = f.read()

    # Run chosen algorithm
    if algorithm == 'aes-128':
        ciphertext, key = encrypt_aes(data, key_size=16)
    elif algorithm == 'aes-256':
        ciphertext, key = encrypt_aes(data, key_size=32)
    elif algorithm == 'chacha20':
        ciphertext, key = encrypt_chacha(data)
    else:
        return jsonify({"error": "Unknown algorithm"}), 400

    # Prepare temporary output
    encrypted_path = path + ".enc"
    with open(encrypted_path, 'wb') as f:
        f.write(ciphertext)

    # Return as file + key in header
    response = send_file(
        encrypted_path,
        mimetype="application/octet-stream",
        as_attachment=True,
        download_name=os.path.basename(encrypted_path)
    )
    response.headers["X-Key"] = key.hex()
    response.headers["X-Algorithm"] = algorithm
    return response


# Optional: Decrypt endpoint for testing
@app.route('/decrypt', methods=['POST'])
def decrypt_file():
    if 'file' not in request.files:
        return jsonify({"error": "No encrypted file provided"}), 400
    if 'key' not in request.form:
        return jsonify({"error": "Missing decryption key"}), 400
    if 'algorithm' not in request.form:
        return jsonify({"error": "Missing algorithm"}), 400

    file = request.files['file']
    key_hex = request.form['key']
    algorithm = request.form['algorithm']
    key = bytes.fromhex(key_hex)

    # Save uploaded encrypted file
    path = save_file(file)
    with open(path, 'rb') as f:
        encrypted_data = f.read()

    # Attempt decryption
    try:
        if algorithm in ['aes-128', 'aes-256']:
            plaintext = decrypt_aes(encrypted_data, key)
        elif algorithm == 'chacha20':
            plaintext = decrypt_chacha(encrypted_data, key)
        else:
            return jsonify({"error": "Unknown algorithm"}), 400

    except Exception as e:
        return jsonify({"error": "Decryption failed", "details": str(e)}), 500

    # Save output to temporary file
    output_path = path + ".dec"
    with open(output_path, 'wb') as f:
        f.write(plaintext)

    # Download plaintext file
    return send_file(
        output_path,
        mimetype='application/octet-stream',
        as_attachment=True,
        download_name='decrypted_output'
    )


if __name__ == '__main__':
    app.run(debug=True)
