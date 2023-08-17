# /SBU/app/api/debate_routes/debate.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.user import db, Debate, Bot
from sqlalchemy.orm import aliased

debate_routes = Blueprint('debate_route', __name__)

@debate_routes.route('/<int:debate_id>', methods=['GET'])
@login_required
def get_debate(debate_id):
    debate = Debate.query.get(debate_id)
    if not debate:
        return jsonify({'error': 'Debate not found'}), 404

    debate_data = debate.to_dict()
    debate_data['conversation_setting'] = debate.conversation_setting.to_dict() if debate.conversation_setting else None

    return jsonify(debate_data), 200

@debate_routes.route('', methods=['GET'])
@login_required
def get_all_debates():
    InitiatorBot = aliased(Bot)  # Create an alias for the initiator bot
    OpponentBot = aliased(Bot)   # Create an alias for the opponent bot

    debates = db.session.query(
        Debate,
        InitiatorBot.name.label('initiator_name'),
        OpponentBot.name.label('opponent_name')
    ) \
    .join(InitiatorBot, InitiatorBot.id == Debate.initiator_bot_id) \
    .join(OpponentBot, OpponentBot.id == Debate.opponent_bot_id).all()

    debate_list = []
    for debate, initiator_name, opponent_name in debates:
        debate_dict = debate.to_dict()
        debate_dict['initiator_name'] = initiator_name
        debate_dict['opponent_name'] = opponent_name
        debate_list.append(debate_dict)

    return jsonify(debate_list), 200
