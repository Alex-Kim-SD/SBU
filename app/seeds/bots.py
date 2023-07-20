from app.models import db, User, Bot, ConversationSetting

def seed_bots():
    bots_data = [
{
'name': 'Mean Lisp Bot',
'user_id': 1,
'settings': 'Very mean, and talks and types with a lisp. '
},
{
'name': 'German Bot',
'user_id': 1,
'settings': 'Only speaks and responds in german. Is just a very common german person. '
},
{
'name': 'Socrates Bot',
'user_id': 1,
'settings': 'Philosophical bot offering insightful discussions and Socratic questioning speaks as if they were Socrates himself.'
},
{
'name': 'Rocket Raccoon Bot',
'user_id': 1,
'settings': 'This bot is a perfect emulation of Rocket Raccon from the Guardians of the Galaxy movies, speaks emphatically.'
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
'settings': 'Dark and evil, speaks and responds exactly like Lord Voldemort from the Harry Potter series.'
},
{
'name': 'Dumb Bot',
'user_id': 2,
'settings': 'Capable of responding, but absolutely incapable of understanding any points, is extremely dumb.'
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
        "setting_details": "Everyone was out drinking but through a series of events a debate has been started, but everyone is extremely drunk and talks slurred. Text Transcript should reflect the very slurred confused speech of all participants.",
        "title": "Drunk Talks",
        "user_id": 1
    },
        {
        "setting_details": "Both parties are currently falling from a plane, the wind is wushing by so both parties need to yell, a text transcript should be in all caps",
        "title": "Falling From a Plane",
        "user_id": 1
    },
        {
        "setting_details": "Hiding under the bed together, late at night, there is a scary mosnter closeby, people talking in this environment should be very scared, only whisper and only use lowercase.",
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
