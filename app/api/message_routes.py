# /SBU/app/api/bot_routes.py
from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from ..models.user import db, Message
from sqlalchemy.exc import SQLAlchemyError

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:debate_id>', methods=['GET'])
def get_messages(debate_id):
    messages = Message.query.filter_by(debate_id=debate_id).all()

    if not messages:
        return jsonify({"error": "No messages found for this debate ID."}), 404

    messages = [message.to_dict() for message in messages]
    return jsonify(messages), 200
