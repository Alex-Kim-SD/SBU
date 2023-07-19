# /SBU/app/api/debate_routes/debate.py
from flask import Blueprint, jsonify, request
from app.models.user import db, Debate

debate_routes = Blueprint('debate_route', __name__)

@debate_routes.route('/<int:debate_id>', methods=['GET'])
def get_debate(debate_id):
    debate = Debate.query.get(debate_id)
    if not debate:
        return jsonify({'error': 'Debate not found'}), 404

    debate_data = debate.to_dict()

    # get data of related entities
    debate_data['conversation_setting'] = debate.conversation_setting.to_dict() if debate.conversation_setting else None

    return jsonify(debate_data), 200
