FROM node:16
RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y   supervisor  openssh-server wget  && echo "root:Docker!" | chpasswd	

# forward request and error logs to docker log collector
RUN mkdir -p /home/LogFiles \
	&& ln -sf /dev/stdout /home/LogFiles/access.log \
	&& ln -sf /dev/stderr /home/LogFiles/error.log
COPY scripts/start.sh /bin/
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY * /home/site/wwwroot/
COPY views/* /home/site/wwwroot/views/
COPY src/* /home/site/wwwroot/src/
COPY app/* /home/site/wwwroot/
RUN chmod 777 /home/site/wwwroot/index.html -Rf
RUN chmod 777 /home/site/wwwroot/*
RUN chmod 777 /home/site/wwwroot/start.sh
RUN chmod 777 /home/site/wwwroot/nasa.mp4
RUN chmod 777 /home/site/wwwroot -Rf
RUN chmod 777 /home/site/wwwroot/embed -Rf
COPY src/readdir.js /home/site/
COPY index.json /home/sites
WORKDIR /home/site/wwwroot
COPY package*.json ./
COPY . .
COPY index.json /home/site/wwwroot
COPY src/readdir.js /home/site/wwwroot
RUN npm i  --ignore-scripts
RUN npm i -s puppeteer
WORKDIR /home/site/wwwroot/src/app
RUN npm i
RUN npm run build
EXPOSE 8080 443 
CMD [ "/bin/start.sh"]


