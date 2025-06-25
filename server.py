from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        result = subprocess.run(
            ['python3', '-m', 'router_classifier.sandbox'],
            capture_output=True,
            text=True
        )
        return jsonify({
            'stdout': result.stdout,
            'stderr': result.stderr,
            'returncode': result.returncode
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
