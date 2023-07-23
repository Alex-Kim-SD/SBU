# SBU/app/models/user.py
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import ForeignKey, DateTime, Text, Column, Integer



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    bots = relationship('Bot', backref='user', cascade="all, delete-orphan")
    conversation_settings = relationship('ConversationSetting', backref='user', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Bot(db.Model):
    __tablename__ = 'bots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("users")}.id', ondelete="CASCADE"), nullable=False)
    settings = db.Column(db.Text)

    transcripts = relationship('Transcript', backref='bot', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'settings': self.settings,
        }


class ConversationSetting(db.Model):
    __tablename__ = 'conversation_settings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("users")}.id', ondelete="CASCADE"), nullable=False)
    setting_details = db.Column(db.Text)

    debates = relationship('Debate', backref='conversation_setting', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'setting_details': self.setting_details,
        }


class Debate(db.Model):
    __tablename__ = 'debates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    conversation_setting_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("conversation_settings")}.id', ondelete="CASCADE"), nullable=False)
    initiator_bot_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("bots")}.id', ondelete="CASCADE"), nullable=False)
    opponent_bot_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("bots")}.id', ondelete="CASCADE"), nullable=False)
    start_time = db.Column(DateTime)
    end_time = db.Column(DateTime)
    topic = db.Column(db.String(255))
    result = db.Column(db.String(255))
    owner_id = Column(Integer, ForeignKey(f'{add_prefix_for_prod("users")}.id', ondelete="CASCADE"), nullable=False)

    transcripts = relationship('Transcript', backref='debate', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'conversation_setting_id': self.conversation_setting_id,
            'initiator_bot_id': self.initiator_bot_id,
            'opponent_bot_id': self.opponent_bot_id,
            'owner_id': self.owner_id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'topic': self.topic,
            'result': self.result,
        }


class Transcript(db.Model):
    __tablename__ = 'transcripts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    debate_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("debates")}.id', ondelete="CASCADE"), nullable=False)
    bot_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("bots")}.id', ondelete="CASCADE"), nullable=False)
    message = db.Column(Text)
    time = db.Column(DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'debate_id': self.debate_id,
            'bot_id': self.bot_id,
            'message': self.message,
            'time': self.time.isoformat() if self.time else None,
        }


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    debate_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("debates")}.id', ondelete="CASCADE"), nullable=False)
    bot_id = db.Column(db.Integer, ForeignKey(f'{add_prefix_for_prod("bots")}.id', ondelete="CASCADE"), nullable=False)
    content = db.Column(Text)
    index = db.Column(db.Integer, nullable=False)
    role = db.Column(db.String(20), nullable=False)
    time = db.Column(DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'debate_id': self.debate_id,
            'bot_id': self.bot_id,
            'content': self.content,
            'index': self.index,
            'role': self.role,
            'time': self.time.isoformat() if self.time else None,
        }
