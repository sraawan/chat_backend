const express = require('express')
const app = express()
const config = require('./../consfig/config')
const signupfunction = require('./../control/cont')

let setRouter= (app)=>{
    let baseurl = `${config.apiVersion}`;

    app.post(`${baseurl}/signup`,signupfunction.singup);
    /**
	 * @api {post} /api/v1/signup To Sign Up the new user 
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    {
          "error": false,
           "message": "user created",
            "status": 200,
              "data": null

					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    {
    "error": true,
    "message": "User Already Present With this Email",
    "status": 403,
    "data": null
}
	   }
	 */

	app.post(`${baseurl}/login`,signupfunction.loginFunction)
	/**
	 * @api {post} /api/v1/login To  Login the new user 
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    {
                "error": false,
                "message": "Login Successful",
                 "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ijdad3VocEZKMCIsImlhdCI6MTU0MzAwNjI2Mzg0NCwiZXhwIjoxNTQzMTc5MDYzLCJzdWIiOiJhZG1pblRva2VuIiwiaXNzIjoic3JhdmFuIiwiZGF0YSI6eyJ1c2VySWQiOiJTN25QXzZlLXEiLCJ1c2VybmFtZSI6InNhaSIsImVtYWlsIjoic3JhYXdhbi5lcnBAZ21haWwuY29tIiwicGhvbmUiOjk3MDA3MDk3MDV9fQ.fHp1k_wStncOPOuGEbyYS7LgJJsXBxOF1-ZwOypoeFw",
              "userDetails": {
                 "userId": "S7nP_6e-q",
                  "username": "sai",
                  "email": "sraawan.erp@gmail.com",
                   "phone": 9700709705
        }
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	{
            "error": true,
            "message": "No User Details Found",
             "status": 404,
               "data": null
}
	   }
	 */
	
	app.get(`${baseurl}/all`,signupfunction.getAllUsers)

	app.get(`${baseurl}/singleUser`,signupfunction.getSingleUser)

	app.post(`${baseurl}/delete/user`,signupfunction.deleteUser)

}
module.exports={
    setRouter:setRouter
}
