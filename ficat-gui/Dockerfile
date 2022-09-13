FROM nginx:latest

ENV NODE_VERSION=10.24.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh"
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

ARG Port_App

## update and install dependency
RUN apt update -y && apt upgrade -y
RUN apt install git htop make cmake gcc g++ gfortran python -y


## create destination directory
RUN mkdir -p /home/app/ficat-gui
WORKDIR /home/app/ficat-gui
COPY . /home/app/ficat-gui/
RUN rm -rf node_modules/*
RUN rm /etc/nginx/conf.d/*
RUN mv /home/app/ficat-gui/nginx.conf /etc/nginx/conf.d/

RUN npm install

## build necessary, even if no static files are needed,
## since it builds the server as well
RUN npm run build


## expose 5000 on container
EXPOSE ${Port_App}

## set app serving to permissive / assigned
ENV HOST=0.0.0.0
## set app port

ENV PORT=${Port_App}

RUN nginx -t
# start the app
#CMD [ "nginx" ]
