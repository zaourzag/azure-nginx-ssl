## Azure App Service for Linux / Nginx Configuration
At the time of this writing Azure is in Preview for App Service running Linux. There are some features missing and this project hopes to provide a stop gap until features are released and available.
 
### Project details
Azure App Service for Linux (AASL) does not yet support running static HTML web sites on Nginx. As such, there was a need to create a Docker image to support my required configuration. Additionally, on Azure it's not necessary to configure SSL/443 or http2 as this is done automatically upstream from the AASL.

- Running latest Nginx version
- Serving static html sites
- Serving Linux file defaults not Windows
- Configured for SSL through http to https redirection.
- 1 day caching for core asset file types

### Pre-requisites
Installation, configuration, and understanding of the latest [Docker](https://docs.docker.com/get-started/)

### Build, compile, and run
1. Fetch and clone the source repository.
    ``` 
    $ git clone https://github.com/awentzel/azure-nginx.git
2. Build with Docker
    ``` 
    $ docker build -t azure-nginx .
3. Running as Docker and listening to web traffic. This is useful to determine if there are any configuration or run-time errors.
    ``` 
    $ docker run -p 80:80 azure-nginx
3. Running as Docker with -d parameter to
    ``` 
    $ docker run -p 80:80 -d azure-nginx
4. Browsing the web site. You may want to comment out the redirect statement to test site is loading correctly. Otherwise, you'll be redirected to https and site will not load except on Azure.
    ``` 
    $ curl http://localhost    

### Project changes and recompiling
1. Review running containers on Docker
    ``` 
    $ docker ps
2. Find the "CONTAINER ID" and copy and past to use after the stop command. You can choose the id or "NAMES"
    ``` 
    $ docker stop 0dce4d4e5f4f
    or
    ``` 
    $ docker stop hardcore_borg
3. Make edits and return to setp #2 for re-building and running Docker

#### Inspiration
A big thanks for giving inspriration and ideas on best way to organize, build, and run the solution.
- [Prashanth Madi](https://github.com/prashanthmadi/apps/tree/master/azure-nginx)
- [ngineered](https://github.com/ngineered/nginx-static)
- [Kyle Mathews](https://www.bricolage.io/hosting-static-sites-with-docker-and-nginx/)
- [h5bp](https://github.com/h5bp/server-configs-nginx)