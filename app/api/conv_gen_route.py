# /SBU/app/api/conv_gen_route.py
from flask import Blueprint, request, jsonify
import os
import openai
from app.models.user import db, Bot, Message, Debate, ConversationSetting
from datetime import datetime

conv_gen_route = Blueprint('conv_gen_route', __name__)

# Be sure to use your own OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@conv_gen_route.route('/create_conversation', methods=['POST'])
def create_conversation():
    # Get input parameters
    bot_id_1 = request.json.get('bot_id_1')
    bot_id_2 = request.json.get('bot_id_2')
    conv_settings_id = request.json.get('conv_settings_id')
    max_messages = request.json.get('max_messages')
    topic = request.json.get('topic')

    # Fetch the bots
    bot_1 = Bot.query.get(bot_id_1)
    bot_2 = Bot.query.get(bot_id_2)
    conv_settings = ConversationSetting.query.get(conv_settings_id)

    # Validate the parameters
    if not bot_1 or not bot_2:
        return jsonify({"error": "Bot not found."}), 400

    if not max_messages:
        return jsonify({"error": "max_messages not found"}), 400

    if not conv_settings:
        return jsonify({"error": "conv_settings not found"}), 400

    if not topic:  # check if topic is not null
        return jsonify({"error": "Topic not found"}), 400

    # Create a new debate
    new_debate = Debate(conversation_setting_id=conv_settings.id, initiator_bot_id=bot_1.id,
                        opponent_bot_id=bot_2.id, start_time=datetime.utcnow(), topic=topic)
    db.session.add(new_debate)
    db.session.commit()

    # Initialize the conversation
    system_def = {
        "role": "system",
        "content": "You are an assistant who specializes in helping emulate conversations between "
    }
    user_request = {
        "role": "user",
        "content": f"Emulate a conversation/debate on this topic: {new_debate.topic} between {bot_1.name} who has these settings {bot_1.settings} and {bot_2.name} who has these settings {bot_2.settings}. "
                   f"Limit each response to 150 characters or less."
                   f"Seperate each response with a new line"
    }

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[system_def, user_request]
    )

    # Iterate over the model responses and add them to the Message table
    for i, choice in enumerate(chat['choices'], start=1):
        message = choice['message']
        assistant_message = message['content']
        bot_id = bot_id_1 if i % 2 != 0 else bot_id_2  # Alternate between bots based on message index
        new_message = Message(debate_id=new_debate.id, bot_id=bot_id, content=assistant_message, role=message['role'], time=datetime.utcnow())
        db.session.add(new_message)
    db.session.commit()


    # Retrieve all messages associated with the debate
    messages = Message.query.filter_by(debate_id=new_debate.id).all()
    messages_response = [message.to_dict() for message in messages]

    return jsonify({
        "message": "Conversation created successfully",
        "debate": {
            "id": new_debate.id,
            "topic": new_debate.topic
        },
        "messages": messages_response
    }), 200
