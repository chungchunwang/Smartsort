# Smartsort
A smart, AI-enabled trash can that makes recycling ever so easy. It automatically sorts your trash for you, whilst gathering data on your trash use that provides data to help you be more ecofriendly.
## Introduction
Happy New Year! 2020 has been a hectic year, and it is a wakeup call for us to pay attention to the issues that trouble our world. Out of these problems, the most longstanding and the most urgent is the environment. In just a couple of years, we have seen temperatures rise, and the world rapidly being filled up with nondegradable trash. This is especially poignant right now, as during the New Year the amount of trash produced in the US increases by a whopping 25%. Tis the season to be smarter about trash, and as such, I built the Smartsort: a smart, AI-enabled trash can that automatically sorts your trash for you, whilst gathering data on your trash use that provides data to help you be more ecofriendly.

## Inspiration
Smartsort came out of a frustration with how tedious the trash sorting process is. How can we get people to be more ecofriendly if it is such a pain to do so? On a recent trip to the junkyard, the manager there told us that it has become increasingly unprofitable for him to recycle the trash there. With additional sorting required to check that everything has been done correctly, he would barely be earning a profit. This stunned me, and seeing the developments in artificial intelligence and object detection, I decided to develop better way. 

## What it does
The Smartsort is a dynamic trash can that automatically sorts your trash into non-recyclable and recyclable trash using a smart AI backend. It also collects data analytics on your daily trash production and presents them in an easy to read, insightful format, giving helpful tips that change based on your data.

## How I built it
### The Bin
The Smartsort began as two trash bins attached together by a simple wooden connector. A “sorting tray” was then assembled in the center of the two bins, which has two servo-powered paddles atop it that swept trash into their respective places. It also contained a scale below it that measured the weight of the trash atop the tray. As such, the tray had to be design in a way so that it was separate from the paddles, allowing it to freely more up and down. A frame was then built around the device with a hole atop, as though the whole contraption was just one trash bin. For the front and back panels of the trash bin I opted to use clear plastic material. As a self-sorting trash can is not something people often see, I thought having a clear view of what was happening would further entice people to use it. Inside the frame, I stuck a simple camera that could take photos of the trash, and a couple of led lights that would illuminate it. I then connected all these components into a Raspberry Pi, which detects for any substantial change in the weight on the tray (meaning that a piece of trash has been thrown in). It would then measure the weight of the trash and take a photo of it, sending all this data to a Google Cloud Compute Engine server running upon it the Smartsort API server. Based on the response (1 for recyclable and 0 for not recyclable) it would then turn the corresponding servo, moving the trash into its corresponding bin.
### The API
The Smartsort API uses an AI object detection model from the PyTorch library, which was trained on the ImageNet dataset. This parses the image sent by the Smartsort trash can, and determines what the trash is. Using this data, the API then determines whether the object is recyclable or not, and it sends this back to the Smartsort trash can as a response. It also sends data (what the trash is, whether it was recycled, weight, time etc.) to a Google Cloud Firebase database, which stores data about a user’s trash usage. 

### The Smartsort Web App
Using the Smartsort web app, you can login to your account and browse your data, whilst receiving dynamically allocated tips based on your information. This web app was built using the React framework, and used the Bootstrap library for styling. Authentication was implemented through “Log in With Google”, safeguarding user information. Without proper authentication, it is not possible to read or write another user’s data. After logging in, you are able to access the main page of the website, which focuses on providing dynamic content. That is, content that alters on a day-to-day basis based on your trash usage. For example, the greeting card that you see at the start changes according to the day, and the quick tip recommendations change based on the weight of your trash. The web app also comes with the Trashlytics section, which encapsulates your data in an easy to read, digestible fashion. It lets you choose between graphs, and allows you to set bounding time frames. Finally, the Smartsort web app also has a “Data Download” page, as I believe that the user’s data should be theirs. We encourage users to use their data in their own creative ways!

## Challenges I ran into
The development of the Smartsort came with some challenges, especially surrounding HTTP requests. As I was previously unfamiliar with sending data though the internet, creating and sending data to the API proved to be a problem for me, as I was often riddled with a bunch of invalid or incomplete data responses.

In addition, I also faced problems with assembling the hardware, as this was my first project of this scale (hardware-wise). Therefore, I was not careful with my cable management, which lead to a GPIO slipping from one pin to another, leading to the Raspberry Pi I was using to short circuit. Fortunately, I had a spare one on hand, however this experience taught me to be more careful and precise in my builds. This led me to plan my cable and chip management for the project more carefully, leading to a sleek design with cables all carefully contained in a hidden compartment.                     
                                                                                                                              
## Accomplishments that I'm proud of
I am most proud of the hardware that work behind the scenes in the Smartsort trash can, as I have never worked with such a large project with so many moving parts. The paddles which move the trash around worked better than I expected, and I was glad to see that it was able to move trash that was in weird and uncommon orientations and directions. Bottles that I carelessly threw in from a distance also worked. 

I am also very proud of the backend built on a Google Compute Engine instance.  Though it was very frustrating at first, after learning more about the topic creating the API was extremely satisfying, and I was amazed to see how seamlessly the trash can was able to work with the AI on the API.

## What I learned
As mentioned above, this project faced many challenges, however it is these challenges above anything else that have taught me the most during this hackathon. In my opinion, I believe that I have now garnered a better understanding of HTTP requests, and have learned to be more orderly and organized in my builds.

In addition, I have also learning a lot about the services Google Cloud provides, as Smartsort uses a Google Compute Engine instance to host its API and a Google Firestore instance for authentication and as a database. I think that learning to use these services was valuable as they are industry leading tools which will be of use in almost any tech job.

## What's next for Smartsort
-	Expand the range of recyclable trash that the Smartsort trash can is able to identify
-	Make the Smartsort trash can be able to sort more categories (e.g., compost)
-	Design more graphs and visual representations for the Smartsort Web App

# How to Set up?
1. Make a Firebase instance and create a Realtime Database.
Set it up as such:
![屏幕截图(30)_LI](https://user-images.githubusercontent.com/62127500/103460842-7b877a80-4d54-11eb-886a-6aa05f762c12.jpg)
* You do not need to do the nodes under entries, they will be added by the API 
* Change the email to be the one you will "log in with google" with
2. On the API, make sure to set the post location to the entries of your account + auth key. On the web app, navigate into /src/firebase.js and change the firebase config to yours.
3. On the server/computer you want to run the API on, navigate into the API folder and call 
```
uvicorn main:app --reload
```
This should set up the API, and you should see the ip and port on which it is running in the console
4. Build a Smartsort trash can and load onto its Raspberry Pi the code provided. You may need to change some of the code to suit your needs, the code is made especially to recieve and get from the servos and scales used in this particular project. Remember to change the ip and port of the code on the Raspberry Pi to be the one your API is on.

## More detailed instructions to come:
 - How to build the trash can
 - Video on how to set up the software
