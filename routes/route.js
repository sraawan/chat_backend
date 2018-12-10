const express = require('express')
const app = express()
const config = require('./../consfig/config')
const signupfunction = require('./../control/cont')

let setRouter= (app)=>{
    let baseurl = `${config.apiVersion}`;

    app.post(`${baseurl}/signup`,signupfunction.singup);
   	 /**
	 * @api {post} /api/v1/signup user signup
	 * @apiVersion 0.0.1
	 * @apiGroup Post
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userName as passed as body parameter
	 * @apiParam {String} email as passed as body parameter
	 * @apiParam {String} phone as passed as body parameter
	 * @apiParam {String} email as passed as body parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "user created",
	    "status": 200,
	    "data": null
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "one or more parameter is missing" ,
	    "status": 500,
	    "data": null
	   }
	 */

	app.post(`${baseurl}/login`,signupfunction.loginFunction)
	/**
	 * @api {post} /api/v1/login user login
	 * @apiVersion 0.0.1
	 * @apiGroup Post
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userName as passed as body parameter
	 * @apiParam {String} email as passed as body parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Login Successful",
	    "status": 200,
	    "data": [{
			"authToken": AuthToken,
        "userDetails": {
            "userId": string,
            "username": string,
            "email": string,
            "phone": number
		         }
			   }
			 ]
	      }	
	
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Login Failed" ,
	    "status": 500,
	    "data": null
	   }
	 */
	app.get(`${baseurl}/all`,signupfunction.getAllUsers)

	/**
	 * @api {get} /api/v1/all  get all users 
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": user data found,
	    "status": 200,
	    "data": [{        
            "userId": string,
            "username": string,
            "email": string,
            "phone": number		       
			   }
			 ]
	      }
	    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "no user found" ,
	    "status": 500,
	    "data": null
	   }
	 */
	

	app.get(`${baseurl}/singleUser`,signupfunction.getSingleUser)

	/**
	 * @api {get} /api/v1/singleUser  Get a user details
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId  pass as query parameter
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Details Found",
	    "status": 200,
	    "data": [{        
            "userId": string,
            "username": string,
            "email": string,
            "phone": number
		       
			    }
			  ]
	    	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "no user found" ,
	    "status": 500,
	    "data": null
	   }
	 */

	app.post(`${baseurl}/delete/user`,signupfunction.deleteUser)
	/**
	 * @api {post} /api/v1//delete/user  Delete a User 
	 * @apiVersion 0.0.1
	 * @apiGroup Delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId  pass as query parameter
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "user Deleted sucessfully",
	    "status": 200,
	    "data": [{        
            "userId": string,
            "username": string,
            "email": string,
            "phone": number
		       
		     }]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "error occured" ,
	    "status": 500,
	    "data": null
	   }
	 */

}
module.exports={
    setRouter:setRouter
}
