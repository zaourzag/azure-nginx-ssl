
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "swagger": "2.0",
    "info": {
      "title": "zakaria api",
      "description": "Description",
      "version": "1.0.0"
    },
    "host": "zaaak.azurewebsites.ne",
    "basePath": "/",
    "schemes": [
      "https"
    ],
    "paths": {
      "/api/code-img/{code}": {
        "get": {
          "description": "",
          "parameters": [
            {
              "name": "code",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            }
          }
        }
      },
      "/api/nekobot/": {
        "get": {
          "description": "",
          "parameters": [
            {
              "name": "text",
              "in": "query",
              "type": "string"
            },
            {
              "name": "username",
              "in": "query",
              "type": "string"
            },
            {
              "name": "type",
              "in": "query",
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/api/code/": {
        "get": {
          "description": "",
          "parameters": [
            {
              "name": "image",
              "in": "query",
              "type": "string"
            },
            {
              "name": "code",
              "in": "query",
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/api/poke/{id}": {
        "get": {
          "description": "",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
