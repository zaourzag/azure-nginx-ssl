#!/bin/bash
service ssh start

# Test that Nginx is configured correctly

/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
