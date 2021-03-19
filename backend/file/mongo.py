from flask import Flask
from flask_pymongo import PyMongo

import pprint


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/eduAll'  # TODO: save in env
mongo = PyMongo(app)


def save_file(filename, data, owner):
    mongo.save_file(filename+owner, data, owner=owner)
    # TODO: handle exception


def get_file(filename, owner):
    return mongo.send_file(filename+owner)
    # TODO: handle exception


def get_all_files(owner):

    def clean_filename(filename):
        return filename.rstrip(owner)

    raw_files = mongo.db.fs.files.find({'owner': owner})
    return [{'filename': clean_filename(f['filename'])} for f in raw_files]
