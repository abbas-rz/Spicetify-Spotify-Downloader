from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute_command():
    data = request.get_json()
    command = data.get('command')
    
    if not command:
        return jsonify({'error': 'No command provided'}), 400
    
    print(f"Executing command: {command}")
    newcom = "python -m spotdl download " + command
    command = newcom
    print(command)
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Execution error: {result.stderr}")
            return jsonify({'error': 'Command execution failed', 'stderr': result.stderr}), 500
        
        print("Command executed successfully")
        return jsonify({'success': True, 'stdout': result.stdout, 'stderr': result.stderr})
    
    except Exception as e:
        print(f"Execution exception: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = 8765
    print(f"Command execution server running at http://localhost:{port}")
    app.run(port=port)
