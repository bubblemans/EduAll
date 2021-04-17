# 2021-spring-cs160-team-EduAll

## Set up
1. [User service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/main/backend/springCrudAPI/README.md)
2. [File service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/file)
3. [Chat API service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/chat-api)
4. [Course service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/course)

## Set up development enviroment using Docker

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
For other services, please read "Set up" in previous section.