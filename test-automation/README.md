# Summary
This section is to describe how we test individual micro-services. You can find our test plans in the [Google Doc](https://drive.google.com/drive/folders/17oldHL6EcOteYzyxQFwPF0Uwqt1FkMXl?usp=sharing) where we describe pre-condition, test steps, input, expected output, and post-conditions.

## File Service
Execute test-file.sh that helps you to upload a file, download that file, and shows all the files that you have right now
```bash
sh test-file.sh
```

## Chat Service
We use Postman to test our chat service where there are 4 different requests for our basic REST APIs. You can find the test results [here](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/main/test-automation/chat.postman_collection.json).

## User Service
We used Postman for this service with 6 different requests. The test result can be found [here](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/userService2.0/test-automation/userService.postman_collection.json).

## Course Service 
We use Postman to test our chat service where there are 4 different requests for our basic REST APIs. You can find the test results [here](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/main/test-automation/courseService.postman_collection.json).

## Frontend
We use Selenium to test frontend. Before running the java file on the current test-automation folder, please download 

selenium-server-standalone-3.9.1.jar
selenium-server-3.9.1.zip
chromedriver

After that, you need to build path for the first two and create folder for the chrome driver



