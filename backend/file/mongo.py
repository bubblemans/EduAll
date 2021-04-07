from flask import Flask
from flask_pymongo import PyMongo

import pprint
import os


app = Flask(__name__)
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
mongo = PyMongo(app)


def save_file(filename, data, owner):
    try:
        mongo.save_file(filename+owner, data, owner=owner)
    except TypeError:
        raise FileError


def get_file(filename, owner):
    try:
        return mongo.send_file(filename+owner)
    except TypeError:
        raise FileError


def get_all_files(owner):

    def clean_filename(filename):
        return filename.rstrip(owner)

    raw_files = mongo.db.fs.files.find({'owner': owner})
    return [{'name': clean_filename(f['filename']), 'date': f['uploadDate']} for f in raw_files]


class FileError(Exception):
    pass
