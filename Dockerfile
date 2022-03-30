FROM node:16
RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y   supervisor  openssh-server wget  && echo "root:Docker!" | chpasswd	

# forward request and error logs to docker log collector
RUN mkdir -p /home/LogFiles \
	&& ln -sf /dev/stdout /home/LogFiles/access.log \
	&& ln -sf /dev/stderr /home/LogFiles/error.log
WORKDIR /home/site/wwwroot

COPY package*.json ./

RUN npm install

COPY ./* /home/site/wwwroot/
COPY ./routes/* /home/sites/wwwroot/routes/
COPY ./views/* /home/sites/wwwroot/views/
COPY ./src/* /home/sites/wwwroot/src
COPY app/* /home/site/wwwroot/
RUN chmod 777 /home/site/wwwroot/index.html -Rf
RUN chmod 777 /home/site/wwwroot/*
RUN chmod 777 /home/site/wwwroot/nasa.mp4
RUN chmod 777 /home/site/wwwroot -Rf
RUN chmod 777 /home/site/wwwroot/embed -Rf
EXPOSE 80 443
CMD ["node", "index.js"]


