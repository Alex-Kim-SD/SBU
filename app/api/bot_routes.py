from flask import Flask, request, jsonify
from models import db, Bot
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

# CREATE
@app.route('/bots', methods=['POST'])
def create_bot():
    try:
        new_bot = Bot(name=request.json['name'], user_id=request.json['user_id'], settings=request.json.get('settings', None))
        db.session.add(new_bot)
        db.session.commit()
        return jsonify(new_bot.id), 201
    except SQLAlchemyError as e:
        return jsonify(error=str(e)), 400

# READ
@app.route('/bots/<int:bot_id>', methods=['GET'])
def read_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None:
        return jsonify(bot.to_dict()), 200
    else:
        return jsonify(error='Bot not found'), 404

# UPDATE
@app.route('/bots/<int:bot_id>', methods=['PUT'])
def update_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None:
        bot.name = request.json.get('name', bot.name)
        bot.settings = request.json.get('settings', bot.settings)
        db.session.commit()
        return jsonify(bot.to_dict()), 200
    else:
        return jsonify(error='Bot not found'), 404

# DELETE
@app.route('/bots/<int:bot_id>', methods=['DELETE'])
def delete_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None:
        db.session.delete(bot)
        db.session.commit()
        return jsonify(success=True), 200
    else:
        return jsonify(error='Bot not found'), 404

if __name__ == "__main__":
    app.run(debug=True)
