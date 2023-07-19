from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import ConversationSetting, db

conversation_settings = Blueprint('settings', __name__)

@conversation_settings.route('', methods=['GET'])
@login_required
def get_all_conversation_settings():
    all_settings = ConversationSetting.query.filter_by(user_id=current_user.id)
    return jsonify([setting.to_dict() for setting in all_settings])

@conversation_settings.route('/<int:id>', methods=['GET'])
@login_required
def get_conversation_setting(id):
    setting = ConversationSetting.query.get(id)
    if setting is None or setting.user_id != current_user.id:
        return jsonify({"error": "Setting not found"}), 404
    return jsonify(setting.to_dict())

@conversation_settings.route('', methods=['POST'])
@login_required
def create_conversation_setting():
    data = request.get_json()
    required_fields = ['title', 'setting_details']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    new_setting = ConversationSetting(
        title=data['title'],
        user_id=current_user.id,
        setting_details=data['setting_details']
    )
    db.session.add(new_setting)
    db.session.commit()
    return jsonify(new_setting.to_dict()), 201

@conversation_settings.route('/<int:id>', methods=['PUT'])
@login_required
def update_conversation_setting(id):
    data = request.get_json()
    setting = ConversationSetting.query.get(id)
    if setting is None or setting.user_id != current_user.id:
        return jsonify({"error": "Setting not found"}), 404

    if 'title' in data:
        setting.title = data['title']
    if 'setting_details' in data:
        setting.setting_details = data['setting_details']
    db.session.commit()
    return jsonify(setting.to_dict())

@conversation_settings.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_conversation_setting(id):
    setting = ConversationSetting.query.get(id)
    if setting is None or setting.user_id != current_user.id:
        return jsonify({"error": "Setting not found"}), 404
    db.session.delete(setting)
    db.session.commit()
    return jsonify({"message": "Setting has been deleted"}), 200
