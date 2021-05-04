# frontend
cd ./frontend
REACT_APP_BASE_URL=http://localhost npm start &

# chat
cd ../backend/chat
npm start &

# chat-api
cd ../chat-api
npm start &

# course
cd ../course
mvn spring-boot:run &

# user(springCrudAPI)
cd ../springCrudAPI
mvn spring-boot:run &

# file
cd ../file
export FLASK_APP=app.py
export MONGO_URI=mongodb://localhost:27017/eduAll
flask run --host=0.0.0.0 &
