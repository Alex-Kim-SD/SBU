# /SBU/app/api/bot_routes.py
from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from ..models import db, Bot
from sqlalchemy.exc import SQLAlchemyError

bot_routes = Blueprint('bots', __name__)

# READ All
@bot_routes.route('/', methods=['GET'])
@login_required
def read_all_bots():
    bots = Bot.query.filter_by(user_id=current_user.id).all()
    if bots:
        return jsonify([bot.to_dict() for bot in bots]), 200
    else:
        return jsonify(error='No bots found for this user'), 404

# READ ONE
@bot_routes.route('/<int:bot_id>', methods=['GET'])
@login_required
def read_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None and bot.user_id == current_user.id:
        return jsonify(bot.to_dict()), 200
    else:
        return jsonify(error='Bot not found'), 404

# CREATE
@bot_routes.route('/', methods=['POST'])
@login_required
def create_bot():
    try:
        new_bot = Bot(name=request.json['name'], user_id=current_user.id, settings=request.json.get('settings', None))
        db.session.add(new_bot)
        db.session.commit()
        return jsonify(new_bot.to_dict()), 201
    except SQLAlchemyError as e:
        return jsonify(error=str(e)), 400


# UPDATE
@bot_routes.route('/<int:bot_id>', methods=['PUT'])
@login_required
def update_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None and bot.user_id == current_user.id:
        bot.name = request.json.get('name', bot.name)
        bot.settings = request.json.get('settings', bot.settings)
        db.session.commit()
        return jsonify(bot.to_dict()), 200
    else:
        return jsonify(error='Bot not found'), 404

# DELETE
@bot_routes.route('/<int:bot_id>', methods=['DELETE'])
@login_required
def delete_bot(bot_id):
    bot = Bot.query.get(bot_id)
    if bot is not None and bot.user_id == current_user.id:
        try:
            db.session.delete(bot)
            db.session.commit()
            return jsonify(success=True), 200
        except SQLAlchemyError as e:
            return jsonify(error=str(e)), 400
    else:
        return jsonify(error='Bot not found'), 404

