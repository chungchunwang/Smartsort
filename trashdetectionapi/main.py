import os, sys, time, datetime, random
import cv2
import pickle
import torch
from PIL import Image
import numpy as np
from torchvision.models.inception import inception_v3
from torchvision import transforms
from fastapi import FastAPI, File, UploadFile
import requests
import datetime
import json

# Pre-Checks
print("Torch checks: ")
print(torch.__version__)
print(torch.version.cuda)
print(torch.backends.cudnn.version())
print(torch.cuda.is_available())
print("---------------------------")
sys.stdout.flush()

# Constants
label_path = 'config/imagenet.p'
filename = 'images/cake.jpg'

app = FastAPI()

# Load model and weights
model = inception_v3(pretrained=True)
model.eval()
if torch.cuda.is_available():
    model.to('cuda')

@app.post("/")
async def root(weight: str, file: UploadFile = File(...)):
    try:
        img_contents = await file.read()
        # Convert string data to numpy array
        np_img = np.fromstring(img_contents, np.uint8)
        # Convert numpy array to image
        parsed_img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        img = cv2.cvtColor(parsed_img, cv2.COLOR_BGR2RGB)
        input_image = Image.fromarray(img)
    except Exception as e:
        return {'error': str(e)}
    print(weight)
    sys.stdout.flush()
    preprocess = transforms.Compose([
        transforms.Resize(299),
        transforms.CenterCrop(299),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    input_tensor = preprocess(input_image)
    input_batch = input_tensor.unsqueeze(0)

    # move the input and model to GPU for speed if available
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')

    with torch.no_grad():
        output = model(input_batch)

    idx = np.argmax(output[0].cpu().numpy())

    with open(label_path, 'rb') as fp:
        data = pickle.load(fp)
    recyclable = ['can', 'water bottle', 'pop bottle', 'soda bottle', 'envelope', 'wooden spoon', 'wine bottle', 'menu',
                  'comic book', 'crossword puzzle', 'crossword', 'pajama', 'pyjama', "pj's'", 'jammies', 'mailbag',
                  'postbag', 'chain', 'cloak', 'cardigan', 'bath towel', 'bow', 'ruler', 'rule', 'suit', 'sunglasses']
    recycle = 0
    if data[idx] in recyclable:
        recycle = 1
    currentTime = datetime.datetime.now()
    url = 'swap this out for your own firebase url, makes sure to add auth key if you put on security settings'
    myobj = {
        "date": {
            "day": currentTime.day,
            "month": currentTime.month,
            "year": currentTime.year
        },
        "object": data[idx],
        "status": recycle,
        "time": {
            "hour": currentTime.hour,
            "minute": currentTime.minute,
            "second": currentTime.second
        },
        "weight": int(weight)
    }

    x = requests.post(url, data=json.dumps(myobj))
    print(x.text)
    sys.stdout.flush()
    return recycle