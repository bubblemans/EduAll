# Prerequisites
- run user service
- run chat api service

# Install dependencies on Mac
```bash
brew install springboot
brew install maven
```

# Set up environment
- Change the mysql username in ./src/main/resources/application.properties
- Change the mysql password in ./src/main/resources/application.properties
- Create a mysql schema **courseDB** on localhost

# Run spring-boot
```bash
mvn spring-boot:run
```

