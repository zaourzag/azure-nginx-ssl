#!/bin/bash
service ssh start

# Test that Nginx is configured correctly
nginx -t

# Supervisor
/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf