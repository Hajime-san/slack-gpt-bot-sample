import subprocess
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

@app.route('/generate-text')
def generate_text():
    ret = subprocess.run(
            "python gpt2-generate.py --model ./checkpoint/gpr2ja-finetune_run1-small --num_generate 1",
            shell=True,
            text=True,
            capture_output=True,
            cwd=r"./opt/gpt2-japanese"
        )
    print(ret.stderr)
    print(ret.stdout)
    return ret.stdout

if __name__ == "__main__":
    app.run(debug=True)
