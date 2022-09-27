FROM ubuntu:18.04
SHELL ["/bin/bash", "-c"]
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y  libxss1 \
      --no-install-recommends 
# ENV  google-chrome-stable
RUN apt-get update \
    && apt-get install  -y nano  supervisor  openssh-server wget curl  && echo "root:Docker!" | chpasswd	&& curl --silent --location https://deb.nodesource.com/setup_16.x |  bash 
RUN  apt-get update && apt-get install -y build-essential nodejs 
# forward request and error logs to docker log collector
RUN curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && dpkg -i cloudflared.deb &&  cloudflared service install eyJhIjoiZjg5YTJhNGFiYTQ0ZWU0OGExMjA5ZDliOGUxNzI4MTkiLCJ0IjoiZWEyOTcyMWUtNDBlYi00MGIxLTllMWMtNzQ5ZjhjN2E5YTZkIiwicyI6IlptUm1aRFpsWkdNdFlUY3paaTAwWVRnM0xUaGtPVFF0WWpWaVpEVmhaamswTjJJeSJ9

RUN apt-get install -y gconf-service chromium-bsu libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils
RUN mkdir -p /home/LogFiles \
	&& ln -sf /dev/stdout /home/LogFiles/access.log \
	&& ln -sf /dev/stderr /home/LogFiles/error.log
COPY scripts/start.sh /bin/
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY config/supervisord.conf /bin/supervisord.conf
WORKDIR /home/site/wwwroot
COPY views/* /home/site/wwwroot/views/
RUN  mkdir ../logs logs && touch ./logs/log.json && touch ../logs/log.json
COPY src/server/ /home/site/wwwroot/src/server
COPY urls.json /home/site/wwwroot/urls.json
COPY urls.json /home/site/urls.json
COPY src/readdir.js /home/site/
COPY index.json /home/sites
COPY . ./ 
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser 
RUN npm i
RUN node node_modules/puppeteer/install.js
RUN mkdir assets
RUN chmod 777 /bin/supervisord.conf
RUN chmod 777 /home/site/wwwroot/*
RUN chmod 777  /etc/supervisor/conf.d/supervisord.conf
RUN chmod 777 /home/site/wwwroot/src/*
EXPOSE 8080 443
CMD [ "bash", "/bin/start.sh"]


