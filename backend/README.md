# Backend
Beep boop under the hood of the dashboard.

# Building :hammer_and_wrench:
## :ship: Docker
1. Install docker for [windows](https://docs.docker.com/desktop/install/windows-install/), [macos](https://docs.docker.com/desktop/install/mac-install/) or [linux](https://docs.docker.com/desktop/install/linux-install/).
2. Run the following command `docker build -t <username>/<repository>:backend -f ./docker/dockerfile .`
3. Launch the image using `docker run -d --restart=always --env-file .env.prod <username>/<repository>:backend`

:warning: Make sure to create/modify `.env.dev` or `.env.prod`.

:warning: Default dockerfile launches in **production**.

## :computer: On machine
1. Download [Python 3.10](https://www.python.org/downloads/release/python-3100/)

:warning: Create two files `.env.dev` and `.env.prod` in the project root in order to interact with mongoDB. See section `.env setup` for more.

:warning: Do not forget to [sync your requirements.txt with PyCharm](https://www.jetbrains.com/help/pycharm/managing-dependencies.html).

:information_source: `dev-requirements.txt` contains all the extra dependencies for development purposes.

## :gear: .env configuration
1. At the root of the project `./backend` create two files and name them `.env.dev` and `env.prod`.
2. Add the following lines for both configuration:
    ```md
    SERVER_ADDRESS=127.0.0.1
    SERVER_PORT=8080
    LOG_FILE_PATH=logs/log.log
    AUTH_SECRET_KEY=a_random_secret_key
    AUTH_ALGORITHM=HS256
    AUTH_ADMIN_USERNAME=a_username
    AUTH_ADMIN_PASSWORD=a_password
    ```

:warning: Do not add space between `=`. Even for string, **do not** add `"`.

:information_source: One file is dedicated to dev purposes (like having a local server), and the other to production.

:information_source: If the log file is not present, it will be created automatically.

# Launching :rocket:

## :computer: On machine

In production:
```commandline
python main.py --env prod
```

In development:
```commandline
python main.py --env dev
```

## Commands
To fix linter and format errors run these two commands:
```commandline
ruff check . --fix
```
```commandline
black .
```