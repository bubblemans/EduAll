from flask import Flask, request, abort, send_file, jsonify
from werkzeug.utils import secure_filename
import mongo
import utils


app = Flask(__name__)
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])  # TODO: need more and it's not used for now
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB


@app.route('/file/<filename>', methods=['POST'])
def post_file(filename):
    if request.method == 'POST':
        f = request.files['file']

        token = '123' # test
        owner = utils.get_user_id(token)

        mongo.save_file(filename, f, owner)

        response = jsonify(success=True)
        response.status_code = 201
        return response


@app.route('/file/<filename>', methods=['GET'])
def get_file(filename):
    token = '123' # test
    owner = utils.get_user_id(token)

    f = mongo.get_file(filename, owner)
    return f


@app.route('/file', methods=['GET'])
def get_file_by_token():
    token = '123' # test
    owner = utils.get_user_id(token)

    data = mongo.get_all_files(owner)
    response = jsonify(data)
    response.status_code = 200
    return response


if __name__ == '__main__':
    app.run(debug=True, port=8000)
