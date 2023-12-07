# My Contribution:

We were talking about how one of the next steps for Sedaro was to integrate 3rd part modeling software with Sedaro. I decided to base my contribution off of this, and add "3rd party simulation data" of comets. 

![](./screenshot.png)

# Functionality
I added a second Docker container that contained an API built with python and Flask. The webpage contains a button, that when pressed, sends an API request to the API requesting comet data. This API could then act as the middleman between the webpage and the 3rd party software. Since I did not have an actual 3rd party to get data from, I instead generated some random comet data. Once this data was recieved from the "3rd party", important data processing could be done on this API container, distributing the computing load away from the container with the web app. Finally, the API container sent back the processed data to the webpage to add to the Plot. 

