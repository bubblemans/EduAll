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
docker run -d -p 3000:3000 -v "$(pwd)":/root/2021-spring-cs160-team-EduAll -it bubblemans/eduall /bin/bash

docker ps # we need the docker container id
docker exec -it [CONTAINER ID] /bin/bash
```

### Inside Docker Container
```bash
cd ~/2021-spring-cs160-team-EduAll
sh install.sh
sh deploy.sh
```

### On your machine
Go to localhost:3000 on your browser
