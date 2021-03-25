FROM python
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 5000
CMD [ "apt-get update" ]
CMD [ "apt-get install net-tools" ]
CMD [ "export", "FLASK_APP=app.py"]
CMD [ "flask", "run", "--host=0.0.0.0"]
