from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from comp import comparacao
import json

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/comparacao', methods=['GET'])
def analise_comp():
  # print('oiii', flush=True)
  # print('request: ', request, flush=True)
  # print('request.data: ', request.data, flush=True)
  # data = json.loads(request.data)
  # print('data: ', data, flush=True)
  realizado = request.args.get('realizado')
  idealizado = request.args.get('idealizado')
  try:
    # print('oi', flush=True)
    # realizado = data['realizado']
    # idealizado = data['idealizado']
    if(bool(realizado) and bool(idealizado)):
      comp = comparacao(realizado, idealizado)
      res = Response(json.dumps(comp), mimetype="application/json",	headers={"Content-Type": "application/json; charset=utf-8"})
      # print('res: ', res)
      return res
    else:
      return 'None'
  except Exception as e: print(e)
  return 'None'

if __name__ == '__main__':
  app.run(host="localhost", port=8000, debug=True)