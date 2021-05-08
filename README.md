# EduAll
For all university/college students who need an online platform to access their classes. EduAll is a web app that provides access to class material as well as allow video call features such as conference calls for the whole of class, individual teacher-student meetings, and such, to make online attendance easier. Unlike Canvas and Zoom that are made to aim for separate purposes, our user-friendly product integrates both functionalities seamlessly and allows students to navigate between class meetings and class material without the trouble of having to sign-in to another platform.

## Table of Contents


## Set up development environment
1. [User service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/main/backend/springCrudAPI/README.md)
2. [File service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/file)
3. [Chat API service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/chat-api)
4. [Course service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/course)

## Set up testing environment using Docker

### On your machine
```bash
docker pull bubblemans/eduall:latest
cd /path/to/2021-spring-cs160-team-EduAll

# create a docker container in background
docker run -d -p 3000:3000 -v "$(pwd)":/root/2021-spring-cs160-team-EduAll -it bubblemans/eduall /bin/bash
```

### Once you have the docker process running in background
```bash
docker ps # we need the docker container id
docker exec -it [CONTAINER ID] /bin/bash
```

### Inside Docker Container
```bash
cd ~/2021-spring-cs160-team-EduAll
sh install.sh
sh deploy.sh
```
Since the repo on your machine is mounted on the repo in the docker container, when you install and deploy the system, there will be changes inside the repo. Hence, you need to manage those changes using git if those changes stop your from development.

### On your machine
Go to localhost:3000 on your browser

### Re-build your changes
If you want to re-build non-nodejs service, you will need to re-compile and re-run that service after terminating the running process **inside the container**.
```bash
ps aux # find the PID of your process
kill [PID]
/usr/bin/python3 /usr/local/bin/flask run --host=0.0.0.0 # example of re-building file service
```
For other services, please read [Set up](#set-up) in previous section.

## Contributing


## License
EduAll is open source software as [MIT](https://choosealicense.com/licenses/mit/).