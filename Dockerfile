FROM phusion/baseimage

RUN apt-get update && apt-get install -y git curl tesseract-ocr

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash 
RUN apt-get install -y nodejs

RUN mkdir /test-app
WORKDIR /test-app

ADD . /test-app

RUN npm install
CMD [ "node", "index.js" ]