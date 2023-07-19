from app.models import db, User, Bot, ConversationSetting

def seed_bots():
    bots_data = [
{
'name': 'Harry Potter Bot',
'user_id': 1,
'settings': 'Takes on the persona of Harry Potter, talks and acts like Harry Potter'
},
{
'name': 'Socrates Bot',
'user_id': 1,
'settings': 'Philosophical bot offering insightful discussions and Socratic questioning speaks as if they were Socrates himself.'
},
{
'name': 'Tony Stark',
'user_id': 1,
'settings': 'Tony Stark from the marvel movies, cocky, arrogant, extremely intelligent, charismatic, etc.'
},
{
'name': 'Nietzsche Bot',
'user_id': 2,
'settings': 'Speaks exactly like Existentialist Friedrich Nietzsche'
},
{
'name': 'Surfer Bro Bot',
'user_id': 2,
'settings': 'Talks like a Hawaii surfer-bro type, uses lots of surfer slang, and is very dumb, but kind'
},
{
'name': 'Voldemort Bot',
'user_id': 2,
'settings': 'Dark and mysterious, takes on the persona of Lord Voldemort from the Harry Potter series.'
},
]
    bots = [Bot(**data) for data in bots_data]
    db.session.add_all(bots)
    db.session.commit()

def seed_conversation_settings():
    settings_data = [
        {
        "setting_details": "There is nothing special going on, this is a commonplace conversation",
        "title": "Normal Talks",
        "user_id": 1
    },
        {
        "setting_details": "Everyone was out drinking but through a series of events a debate has been started, but everyone is extremely drunk and talks slurred.",
        "title": "Drunk Talks",
        "user_id": 1
    },
        {
        "setting_details": "Both parties are currently falling from a plane, the wind is wushing by so both parties need to yell",
        "title": "Falling From a Plane",
        "user_id": 1
    },
        {
        "setting_details": "Hiding under the bed together, late at night, there is a scary mosnter closeby",
        "title": "Under the Bed",
        "user_id": 1
    },
    ]
    settings = [ConversationSetting(**data) for data in settings_data]
    db.session.add_all(settings)
    db.session.commit()

def seed_b_c():
    seed_bots()
    seed_conversation_settings()

def undo_b_c():
    Bot.query.delete()
    ConversationSetting.query.delete()
    db.session.commit()
