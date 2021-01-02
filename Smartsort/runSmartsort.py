from picamera import PiCamera
from time import sleep
import requests
import serial
import sys
import RPi.GPIO as GPIO
from hx711 import HX711
import json

referenceUnit = 429.5

serialHandle = serial.Serial("/dev/ttyAMA0", 115200)

def servoWriteCmd(id, cmd, par1 = None, par2 = None):
    buf = bytearray(b'\x55\x55')
    try:
        len = 3
        buf1 = bytearray(b'')

        if par1 is not None:
            len += 2
            buf1.extend([(0xff & par1), (0xff & (par1 >> 8))])
        if par2 is not None:
            len += 2
            buf1.extend([(0xff & par2), (0xff & (par2 >> 8))])
        buf.extend([(0xff & id), (0xff & len), (0xff & cmd)])
        buf.extend(buf1)

        sum = 0x00
        for b in buf:
            sum += b
        sum = sum - 0x55 - 0x55
        sum = ~sum
        buf.append(0xff & sum)
        serialHandle.write(buf)
    except Exception as e:
        print(e)

hx = HX711(13, 19)

hx.set_reading_format("MSB", "MSB")
hx.set_reference_unit(referenceUnit)
hx.reset()
hx.tare()
lastVal = 0;
camera = PiCamera()
while True:
    try:
        val = hx.get_weight(5)
        print(val)
        if abs(val-lastVal) > 5:
            #camera.start_preview();
            #sleep(3);
            #camera.stop_preview();
            camera.capture("image.jpg");
            sendFile = {"file": open("image.jpg","rb")}
            sendData = {"weight":str(int(val))}
            #print(sendData)
            response =requests.post("http://35.201.142.121:8000", files = sendFile, params = sendData);
            #print(response)
            #print(response.text)
            if response.text == '1':
                servoWriteCmd(2,1,0,1000)
                sleep(1)
                servoWriteCmd(2, 1, 420, 1000)
                print("recycle")
            else:
                servoWriteCmd(1, 1, 0, 1000)
                sleep(1)
                servoWriteCmd(1, 1, 420, 1000)
                print("don't recycle")
            sleep(2)
            lastVal = hx.get_weight(5)
        else:
            lastVal = val
        hx.power_down()
        hx.power_up()

    except (KeyboardInterrupt, SystemExit):
        GPIO.cleanup()
        sys.exit()