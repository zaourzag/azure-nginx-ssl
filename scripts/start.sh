#!/bin/bash
service ssh start
wget -Lo nasa.gif https://nasa.zakariaa.nl/nasa.gif  
chmod 777 nasa.gif
mv nasa.gif /home/site/wwwroot/
# Test that Nginx is configured correctly
nginx -t

# Supervisor
/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf