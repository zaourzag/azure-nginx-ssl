FROM nginx:1.13
RUN apt-get update \
&& apt install curl -y
# Install openssh-server to provide web ssh access from kudu, supervisor to run processor
RUN  apt-get install --no-install-recommends --no-install-suggests -y  supervisor nano openssh-server wget  && echo "root:Docker!" | chpasswd	
# forward request and error logs to docker log collector
RUN mkdir -p /home/LogFiles \
	&& ln -sf /dev/stdout /home/LogFiles/access.log \
	&& ln -sf /dev/stderr /home/LogFiles/error.log
WORKDIR /home/site/wwwroot
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf	
COPY config/sshd_config /etc/ssh/
COPY app/build/ /home/site/wwwroot/nginx/app/build/
COPY api-docs/* /home/site/wwwroot/api-docs/
COPY start.sh /bin/start.sh
COPY ./ /
RUN chmod 777 /home/site/wwwroot/nginx/app/build/index.html -Rf
RUN chmod 777 /home/site/wwwroot -Rf
RUN chmod 777 /home/site/wwwroot/api-docs/* -Rf
COPY app/build/* ./
EXPOSE 80 443
CMD ["/bin/start.sh"]