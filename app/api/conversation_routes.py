from flask import Blueprint, request, jsonify
from .models import ConversationSetting, db

conversation_settings = Blueprint('conversation_settings', __name__)

@conversation_settings.route('/', methods=['GET'])
def get_all_conversation_settings():
    all_settings = ConversationSetting.query.all()
    return jsonify([setting.to_dict() for setting in all_settings])

@conversation_settings.route('/<int:id>', methods=['GET'])
def get_conversation_setting(id):
    setting = ConversationSetting.query.get(id)
    if setting is None:
        return jsonify({"error": "Setting not found"}), 404
    return jsonify(setting.to_dict())

@conversation_settings.route('/', methods=['POST'])
def create_conversation_setting():
    data = request.get_json()
    new_setting = ConversationSetting(user_id=data['user_id'], setting_details=data['setting_details'])
    db.session.add(new_setting)
    db.session.commit()
    return jsonify(new_setting.to_dict()), 201

@conversation_settings.route('/<int:id>', methods=['PUT'])
def update_conversation_setting(id):
    data = request.get_json()
    setting = ConversationSetting.query.get(id)
    if setting is None:
        return jsonify({"error": "Setting not found"}), 404

    setting.user_id = data.get('user_id', setting.user_id)
    setting.setting_details = data.get('setting_details', setting.setting_details)
    db.session.commit()
    return jsonify(setting.to_dict())

@conversation_settings.route('/<int:id>', methods=['DELETE'])
def delete_conversation_setting(id):
    setting = ConversationSetting.query.get(id)
    if setting is None:
        return jsonify({"error": "Setting not found"}), 404
    db.session.delete(setting)
    db.session.commit()
    return jsonify({"message": "Setting has been deleted"}), 200
