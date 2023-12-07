from flask import Flask, jsonify
from flask_cors import CORS
import random


app = Flask(__name__)
CORS(app)

indexInNameList = 0

def retrieveDataFrom3rdParty():
    """
    Here would be where we would communicate with 3rd Party simulation software through API requests. 
    Then we could process the data within this container, seperate from the container with the web application to distribute the computing load. 
    Instead, I will just make random comets that will be near the satellite. 
    """
    slope = random.random() -.5 #generate a slope in the range [-.5, .5] so that the slope is not too extreme 

    startX = random.random()*1.  #want to make comet is near the satellite / planet
    startY = random.random()*1.5 -.5

    xArr = [startX]
    yArr = [startY]
    for i in range(5):#generate a line of the comets path based on the starting point and slope
        xArr.append(startX+.25*i)
        yArr.append(startY+slope*.25*i)

    global indexInNameList
    famous_comets = [
        "Halley's Comet",
        "Comet Hale-Bopp",
        "Comet Hyakutake",
        "Comet Encke",
        "Comet Biela",
        "Comet Borrelly",
        "Comet Brooks",
        "Comet Brorsen",
        "Comet de Vico",
        "Comet Donati",
        "Comet Grigg-Skjellerup",
        "Comet Holmes",
        "Comet Ikeya-Seki",
        "Comet Kohoutek",
    ]

    data = {
        "xArr": xArr, 
        "yArr": yArr,
        "type": "scatter", 
        "name": famous_comets[indexInNameList % len(famous_comets)],
    }
    indexInNameList+=1

    return data

@app.route('/api/getComet', methods=['GET'])
def comet():
    """
    This will be the endpoint of the request sent by the webpage. The endpoint will reply with simulation data of a comet. 
    """
    cometData=retrieveDataFrom3rdParty()

    return jsonify(cometData)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)