from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from comp import comparacao
import json

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/comparacao', methods=['GET'])
def analise_comp():
  print('oiii', flush=True)
  print('request: ', request, flush=True)
  try:
    data = request.json
    print('data: ', data, flush=True)
    print('oi', flush=True)
    errado = data['errado']
    idealizado = data['idealizado']
    if(bool(errado) and bool(idealizado)):
      comp = comparacao(errado, idealizado)
      res = Response(json.dumps(comp), mimetype="application/json",	headers={"Content-Type": "application/json; charset=utf-8"})
      print('res: ', res)
      return res
    else:
      return 'None'
  except Exception as e: print(e)
  return 'None'

if __name__ == '__main__':
  app.run(host="localhost", port=8000, debug=True)