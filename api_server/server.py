from flask import Flask, request
import requests
from base64 import b64decode
from tempfile import mkstemp as mktemp
from os import fdopen
import json

def send_coqnitics(base64_img, post_url):
    raw_img = b64decode(base64_img)
    
    post_data = {'access_key': '866b74743f9ac85998d7', 
            'secret_key': '3754dd38511718413783b24c18b2c36669b47a8e'}

    post_file = {'filename': ('image.jpeg', raw_img)}
    
    res = requests.post(post_url, files=post_file, data=post_data)
    content = res.content
    
    return content

app = Flask(__name__)

@app.route('/<req_type>', methods=['POST'])
def index(req_type):
    imageBase64 = request.values['image']
    
    req_url = ""
    
    if req_type == 'face':
        req_url = 'https://face.recoqnitics.com/analyze'
    elif req_type == 'fashion':
        req_url = 'https://fashion.recoqnitics.com/analyze'
    else:
        return 'Type not supported', 401

    respond = send_coqnitics(imageBase64, req_url)
    return respond

if __name__ == "__main__":
    app.run()
