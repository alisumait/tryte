from flask import Flask, request
import requests
from base64 import b64decode
from tempfile import mkstemp as mktemp
from os import fdopen
import json

def send_coqnitics(base64_img):
    raw_img = b64decode(base64_img)
    
    post_url = 'https://face.recoqnitics.com/analyze'
    post_data = {'access_key': '866b74743f9ac85998d7', 
            'secret_key': '3754dd38511718413783b24c18b2c36669b47a8e'}

    post_file = {'filename': ('image.jpeg', raw_img)}
    
    res = requests.post(post_url, files=post_file, data=post_data)
    content = res.content
    
    return content

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    imageBase64 = request.values['image']
    
    respond = send_coqnitics(imageBase64)
    return respond
    return '<img src="data:image/png;base64,{}" />'.format(imageBase64)

if __name__ == "__main__":
    app.run()
