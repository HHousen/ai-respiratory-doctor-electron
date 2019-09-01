from werkzeug.utils import secure_filename
import mimetypes, re
from flask_cors import CORS
# Import Fastai Libraries
from fastai import *
from fastai.vision import *

from flask import Flask, escape, request, jsonify

app = Flask(__name__)
CORS(app)

NAME_OF_FILE = 'export.pkl' # Name of your exported file
PATH_TO_MODELS_DIR = Path('models') # by default just use /models in root dir

defaults.device = torch.device('cpu')
learn = load_learner(PATH_TO_MODELS_DIR, file=NAME_OF_FILE)

def model_predict(img_path):
    img = open_image(img_path)
    pred_class,pred_idx,outputs = learn.predict(img)
    model_results = outputs.numpy().tolist()
    model_results_percent = [i * 100 for i in model_results]
    classes = learn.data.classes
    final = dict(zip(classes, model_results_percent))
    return final

@app.route('/predict-api', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        upload = request.get_json(force=True)
        paths = list()
        result = {}
        # Get the files from post request
        for file_path in upload:
            if  re.match("image/*", mimetypes.guess_type(file_path)[0]):
                paths.append(file_path)
            else:
                return 'Error: Invalid File Type', 400 

        for file_path in paths:
            # Make prediction
            preds = model_predict(file_path)
            name = os.path.basename(file_path).split('.')[0]
            result[name] = preds

        return json.dumps(result)
    return 'OK'