import requests
import os
import logging


API_URL = os.environ.get('API_URL')
logging.basicConfig(level=logging.DEBUG)

def get_user_id(token):
    url = os.environ.get('BASE_URL') + ':8080/api/users/1/token?token={}'.format(token)
    logging.info(url)
    res = requests.get(url)
    user_id = res.json()['userID']
    return user_id
