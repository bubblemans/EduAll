import requests
import os


API_URL = os.environ.get('API_URL')


def get_user_id(token):
    # url = '{}/{}'.format(API_URL, token)
    # res = requests.get(API_URL)
    # user_id = res['user_id']
    # return user_id
    return token  # test
