# SBU (Stop Being Unreasonable)

Welcome to SBU! This web application is based around the idea of AI Dialogue generation. Have you ever wondered what a debate between Ironman and Voldemort would look like? How about Socrates and Nietzsche debating the validity of the pursuit of happiness? Create and manage AI personalities and engage them in dialogue with other AI personalities on any topics of your choosing!

## Live Link

(https://sbu.onrender.com/)

## Index
[Feature List](https://github.com/Alex-Kim-SD/SBU/wiki/SBU-MVP-Feature%E2%80%90list) |
[User Stories](https://github.com/Alex-Kim-SD/SBU/wiki/User-Stories) |
[DatabaseSchema](https://github.com/Alex-Kim-SD/SBU/wiki/SBU-Database-Schema)

# Technologies Used

 SBU is powered by an array of modern web development technologies across the stack. Here's a brief rundown:
- **OpenAI, API**: Integration with Open AI's GPT API.
- **JavaScript**: The core language of the application, used for building interactive elements on the client side.
- **React**: A JavaScript library for building user interfaces. We've used React to build the components of our app in a modular and maintainable way.
- **JSX**: Syntax extension for JavaScript, used with React to describe what the UI should look like.
- **Redux**: A predictable state container for JavaScript apps. We used Redux alongside React for state management.
- **Python**: The core language on the server side, used to build the backend of the application.
- **Flask**: A Python web framework used to create the server side of the application. We've used Flask to handle requests and responses.
- **Flask-CORS**: A Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- **Flask-SQLAlchemy**: A Flask extension that simplifies the use of SQLAlchemy (a SQL toolkit and Object-Relational Mapping system) with Flask by providing useful defaults and extra helpers.
- **Alembic**: A database migration tool for SQLAlchemy, used to handle changes in the database schema.
- **Python-Pillow (PIL)**: An open-source Python Imaging Library that adds image processing capabilities to our Python interpreter.
- **Font Awesome**: A toolkit for vector icons and social logos, used for adding intuitive icons throughout the application.
- **WTForms**: A flexible forms validation and rendering library for Python, used in the server side for form validation.

These technologies work together to create a seamless, interactive, and user-friendly web application.

## Landing Page![SBU-Landing](https://github.com/Alex-Kim-SD/SBU/assets/121044844/b6edfde3-8775-49e8-b976-7faa538ccea5)

## Home Page![SBU-Home](https://github.com/Alex-Kim-SD/SBU/assets/121044844/11115abb-f625-42d4-ac0e-98056fd4e964)

## BotCreation![SBU-Bot-Creation](https://github.com/Alex-Kim-SD/SBU/assets/121044844/d0bd38d2-a99c-4aa9-ad09-15152e50dfee)


## Running Locally || Getting Started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
