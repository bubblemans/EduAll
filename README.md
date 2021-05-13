![Current Version](https://img.shields.io/badge/version-v0.1-blue)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/flask)
![node-current](https://img.shields.io/node/v/react)
![GitHub](https://img.shields.io/github/license/bubblemans/EduAll?label=License&style=flat-square)


<img width="450" alt="Screen Shot 2021-05-08 at 9 56 24 PM" src="https://user-images.githubusercontent.com/23702266/117541819-45327280-b048-11eb-97bd-edc75dcb10e8.png">

For all university/college students who need an online platform to access their classes. **EduAll** is a web app that provides access to class material as well as allow video call features such as conference calls for the whole of class, individual teacher-student meetings, and such, to make online attendance easier. Unlike Canvas and Zoom that are made to aim for separate purposes, our user-friendly product integrates both functionalities seamlessly and allows students to navigate between class meetings and class material without the trouble of having to sign-in to another platform.

## Table of Contents
- [System Design](#system-design)
  - [Microservice System Architecture](#microservice-system-architecture)
  - [Database Design](#database-design)
  - [Rest API Design](#rest-api-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Set up development environment](#set-up-development-environment)
  - [Set up testing environment using Docker](set-up-testing-environment-using-docker)
- [Contributing](#contributing)
- [License](#license)


## System Design

### Microservice System Architecture
The entire system consists of 7 microservices: **user service, course service, file service, video service, chat service, chat api service, and frontend service**. For unstructured data, such as chat messages, video information, and files, we store them into MongoDB. And for more structured data, such course information and user information, we store them into MySQL. In addition, we use Redis to cache frequent data, for example, the most recent message sent in different chats.

<img width="850" alt="System Architecture" src="https://user-images.githubusercontent.com/23702266/117543915-795e6100-b051-11eb-8477-cc1dc93e0629.png">

### Database Design
You can read our [database design](https://drive.google.com/file/d/1ykf21kyD9d7nylV-DDnuOfHVdDr03vR8/view?usp=sharing).

### Rest API Design
You can read our [API design](https://docs.google.com/document/d/1Gm2WcxcWcRM2PFdHykOlY2R84tYWzY2ORbWMtLrW4dU/edit?usp=sharing).
Since our architecture is microservice, some of our backend services are in separate documents, so you can read [file service](https://app.swaggerhub.com/apis/bubblemans/file/1.0.0) and [chat service](https://app.swaggerhub.com/apis/bubblemans/chat/1.0.0) on **Swagger**.


## Getting Started

### Prerequisites
| Tools       |     Version  |
| ----------- | ----------- |
| Python      |    v3.7.0    |
| Node        |   v12.16.1   |
| Spring-boot |    v2.4.3    |
| Maven       |    v4.0.0    |
| MySQL       |   v8.0.19    |
| MongoDB     |    v4.4.0    |
| Redis       |    v6.2.1    |
| Docker      |    v20.10.2  |


### Set up development environment
1. [User service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/blob/main/backend/springCrudAPI/README.md)
2. [File service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/file)
3. [Chat API service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/chat-api)
4. [Chat Socket](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/chat)
5. [Course service](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/backend/course)
6. [Frontend](https://github.com/bubblemans/2021-spring-cs160-team-EduAll/tree/main/frontend)

### Set up testing environment using Docker

#### On your machine
```bash
docker pull bubblemans/eduall:latest
cd /path/to/2021-spring-cs160-team-EduAll

# create a docker container in background
docker run -d -p 3000:3000 -v "$(pwd)":/root/2021-spring-cs160-team-EduAll -it bubblemans/eduall /bin/bash
```

#### Once you have the docker process running in background
```bash
docker ps # we need the docker container id
docker exec -it [CONTAINER ID] /bin/bash
```

#### Inside Docker Container
```bash
cd ~/2021-spring-cs160-team-EduAll
sh install.sh
sh update.sh
sh deploy.sh
```
Since the repo on your machine is mounted on the repo in the docker container, when you install and deploy the system, there will be changes inside the repo. Hence, you need to manage those changes using git if those changes stop your from development.

#### On your machine
Go to localhost:3000 on your browser

#### Re-build your changes
If you want to re-build non-nodejs service, you will need to re-compile and re-run that service after terminating the running process **inside the container**.
```bash
ps aux # find the PID of your process
kill [PID]
/usr/bin/python3 /usr/local/bin/flask run --host=0.0.0.0 # example of re-building file service
```
For other services, please read [Set up development environment](#set-up-development-environment) in previous section.

You can also re-build the entire system by running the commands.
```bash
sh update.sh
sh deploy.sh
```

## Contributing
If you are a repo collaborator, you can just push to your branch, and we suggest you follow [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

Moreover, we welcome any pull requests! You can [fork](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) and send us a PR!

## License
EduAll is open source software as [MIT](https://choosealicense.com/licenses/mit/).
