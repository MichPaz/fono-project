from flask import Flask, request
from flask_cors import CORS, cross_origin
from comp import comparacao
import json

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/comparacao', methods=['GET'])
def analise_comp():
  data = request.json
  errado = data['errado']
  idealizado = data['idealizado']
  if(bool(errado) and bool(idealizado)):
    comp = comparacao(errado, idealizado) 
    return json.dumps(comp, indent=4)
  else:
    return 'None'

if __name__ == '__main__':
  app.run(host="localhost", port=8000, debug=True)