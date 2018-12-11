define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/delete/user",
    "title": "Delete a User",
    "version": "0.0.1",
    "group": "Delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass as query parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"user Deleted sucessfully\",\n\t    \"status\": 200,\n\t    \"data\": [{        \n            \"userId\": string,\n            \"username\": string,\n            \"email\": string,\n            \"phone\": number\n\t\t       \n\t\t     }]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"error occured\" ,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "Delete",
    "name": "PostApiV1DeleteUser"
  },
  {
    "type": "post",
    "url": "/api/v1/login",
    "title": "user login",
    "version": "0.0.1",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>as passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>as passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Login Successful\",\n\t    \"status\": 200,\n\t    \"data\": [{\n\t\t\t\"authToken\": AuthToken,\n        \"userDetails\": {\n            \"userId\": string,\n            \"username\": string,\n            \"email\": string,\n            \"phone\": number\n\t\t         }\n\t\t\t   }\n\t\t\t ]\n\t      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Login Failed\" ,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "Post",
    "name": "PostApiV1Login"
  },
  {
    "type": "post",
    "url": "/api/v1/signup",
    "title": "user signup",
    "version": "0.0.1",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>as passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>as passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>as passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"user created\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"one or more parameter is missing\" ,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "Post",
    "name": "PostApiV1Signup"
  },
  {
    "type": "get",
    "url": "/api/v1/all",
    "title": "get all users",
    "version": "0.0.1",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": user data found,\n\t    \"status\": 200,\n\t    \"data\": [{        \n            \"userId\": string,\n            \"username\": string,\n            \"email\": string,\n            \"phone\": number\t\t       \n\t\t\t   }\n\t\t\t ]\n\t      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"no user found\" ,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "Read",
    "name": "GetApiV1All"
  },
  {
    "type": "get",
    "url": "/api/v1/singleUser",
    "title": "Get a user details",
    "version": "0.0.1",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass as query parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [{        \n            \"userId\": string,\n            \"username\": string,\n            \"email\": string,\n            \"phone\": number\n\t\t       \n\t\t\t    }\n\t\t\t  ]\n\t    \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"no user found\" ,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "Read",
    "name": "GetApiV1Singleuser"
  }
] });
