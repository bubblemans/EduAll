from flask import Flask, request, abort, send_file, jsonify
from werkzeug.utils import secure_filename
import mongo
import utils
import logging


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

logging.basicConfig(level=logging.DEBUG)

with open('./extensions.txt') as rf:
    ALLOWED_EXTENSIONS = set([ext.replace('\n', '') for ext in rf.readlines()])


@app.route('/file/<filename>', methods=['POST'])
def post_file(filename):

    def is_allowed_ext(filename):
        extension = filename.split('.')[-1]
        return extension in ALLOWED_EXTENSIONS

    if request.method == 'POST':
        f = request.files['file']
        token = request.args.get('token')
        owner = utils.get_user_id(token)

        try:
            if is_allowed_ext(filename):
                mongo.save_file(filename, f, owner)
                response = jsonify(success=True)
                response.status_code = 201
                return response
            else:
                return abort(400)
        except mongo.FileError:
            return abort(400)


@app.route('/file/<filename>', methods=['GET'])
def get_file(filename):
    token = request.args.get('token')
    owner = utils.get_user_id(token)

    try:
        f = mongo.get_file(filename, owner)
        return f
    except mongo.FileError:
            return abort(400)


@app.route('/file', methods=['GET'])
def get_file_by_token():
    token = request.args.get('token')
    owner = utils.get_user_id(token)

    data = mongo.get_all_files(owner)
    response = jsonify(data)
    response.status_code = 200
    return response


if __name__ == '__main__':
    app.run(debug=True, port=8000)
