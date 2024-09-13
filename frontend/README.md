# Frontend
Oh... wait. Is this a shiny UI that appeared ?

# Building :hammer_and_wrench:
## :ship: Docker
1. Install docker for [windows](https://docs.docker.com/desktop/install/windows-install/), [macos](https://docs.docker.com/desktop/install/mac-install/) or [linux](https://docs.docker.com/desktop/install/linux-install/).
2. Run the following command `docker build -t <username>/<repository>:frontend -f ./docker/dockerfile .`
3. Launch the image using `docker run -d --restart=always <username>/<repository>:frontend`

# Launching :rocket:

## :computer: On machine
1. `npm install`
2. `npm start`
