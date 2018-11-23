    const express = require('express')
    const mongoose = require('mongoose')
    
    const validateEmail= require('./../lib/validateEmaillib')
    const responce = require('./../lib/responcelib')
    const logger = require('./../lib/loggerlib')
    const check = require('./../lib/checklib')
    const shortid = require('shortid')
    const password = require('./../lib/posswrodlib')
    const useM = require('./../model/userM')
    const authM = require('./../model/AuthM')
    const token = require('./../lib/auth_token')
    const time = require('./../lib/timelib')
    const AuthModel = mongoose.model('Auth')
    
    const signUpModel = mongoose.model('user')

    let getAllUsers = (req,res)=>{      
          signUpModel.find()
          .select(' -__v -_id')
          .lean()
          .exec((err,result)=>{
              if(err){
                  console.log(err)
                  logger.error('no users found','userController:getAllUsers()',10)
                  let apiResponse = responce.generate(true,'no user data found',404,null)
                  res.send(apiResponse)
              }else{
                  res.send(result)
              }
          })
        }

        let getSingleUser = (req, res) => {
        signUpModel.findOne({ 'userId': req.query.userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'User Controller: getSingleUser', 10)
                        let apiResponse = responce.generate(true, 'Failed To Find User Details', 500, null)
                        res.send(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No User Found', 'User Controller:getSingleUser')
                        let apiResponse = responce.generate(true, 'No User Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = responce.generate(false, 'User Details Found', 200, result)
                        res.send(apiResponse)
                    }
                })
        }// end get single user
      
        let deleteUser = (req, res) => {
            signUpModel.findOneAndRemove({ 'userId': req.query.userId })
                     .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'User Controller: getSingleUser', 10)
                            let apiResponse = responce.generate(true, 'Failed To Find User Details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No User Found', 'User Controller:getSingleUser')
                            let apiResponse = responce.generate(true, 'No User Found', 404, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = responce.generate(false, 'user Deleted sucessfully', 200, result)
                            res.send(apiResponse)
                        }
                    })
            }// end get single user
    
    
    let singup = (req,res)=>{
       let validateUser=()=>{
        return new Promise((resolve,reject)=>{
            if (req.body.email){
                if(!validateEmail.Email(req.body.email)){
                 let apiresponce = responce.generate(true,'email does not met  requirments',404,null)
                 reject(apiresponce)
                }else if(check.isEmpty(req.body.password)){
                    let apiresponce = responce.generate(true,'password parameter is missing',404,null)
                    reject(apiresponce)                    
                }else{
                     resolve(req)
                     console.log(req)
                }
            }else{
            logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
            let apiresponce = responce.generate(true,'one or more parameter is missing',400,null)
            reject(apiresponce)
            }
        })
       }
       let createUser = ()=>{
        return new Promise((resolve, reject) => {
           signUpModel.findOne({email:req.body.email})
           .exec((err,retrievedUserDetails)=>{
           if(err){
               console.log(err)
               logger.error(err.message,'userController:createuser()',10)
               let apiresponce= responce.generate(true,'Failed to create user',404,null)
               reject(apiresponce)
           }else if (check.isEmpty(retrievedUserDetails)){
               let newUser = new signUpModel({
                   userId : shortid.generate(),
                   username:req.body.username,
                   email:req.body.email.toLowerCase(),
                   password:password.hashpassword(req.body.password),
                   phone:req.body.phone

               })
               newUser.save((err,newUser)=>{
                     if(err){
                         console.log(err)
                         let apiresponce = responce.generate(true,'newuser not created',404,null)
                         reject(apiresponce)
                     }else{
                         let newUserObjt = newUser.toObject()
                         console.log(newUserObjt)
                         resolve(newUserObjt)

                     }
               })
           }else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = responce.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
            })//end of promise
             }//end of createUser
           validateUser(req,res)
       .then(createUser)
       .then((resolve)=>{
           delete resolve.password
           let apiresponce = responce.generate(false,'user created',200,null)
           console.log(apiresponce)
           res.send(apiresponce)
       }).catch((err)=>{
           res.send(err)
       })
       
       
   
   }//end of  signupfunction
   let loginFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                signUpModel.findOne({ email: req.body.email}, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiresponce = responce.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiresponce)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiresponce = responce.generate(true, 'No User Details Found', 404, null)
                        reject(apiresponce)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });
               
            } else {
                let apiresponce = responce.generate(true, '"email" parameter is missing', 400, null)
                reject(apiresponce)
            }
        })

    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            password.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiresponce = responce.generate(true, 'Login Failed', 500, null)
                    reject(apiresponce)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiresponce = responce.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiresponce)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiresponce = responce.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiresponce)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails)=>{
        return new Promise ((resolve,reject)=>{
        AuthModel.find({userId:tokenDetails.userId},(err,getTokenDetails)=>{
              if (err){
                  logger.info('no user Found','userController:saveToken',9)
                  let apiResponse = responce.generate(true,'no user found',403,null)
                  reject(apiResponse)
              }else if(check.isEmpty(getTokenDetails)){
                  let newAuthToken = new AuthModel({
                      userId :tokenDetails.userId,
                      authToken:tokenDetails.token,
                      tokenScreat:tokenDetails.tokenScreat,
                      tokenGenerationTime:time.now()
                  })
                  newAuthToken.save((err,newToken) =>{
                     if(err){
                         logger.info('error in saving data','userController',10)
                         let apiResponse = responce.generate(true,'data not saved',404,null)
                         reject(apiResponse)

                     }else{
                         let responseBody = {
                             authToken:newToken.authToken,
                             userDetails:tokenDetails.userDetails
                        }
                        resolve(responseBody)
                     }
                     
                    })
              }else{
                  getTokenDetails.authToken = tokenDetails.token,
                  getTokenDetails.tokenScreat = tokenDetails.tokenScreat,
                  getTokenDetails.tokenGenerationTime = time.now()
                  getTokenDetails.save((err,newTokenDetails)=>{
                      if(err){
                        logger.info('error in saving data','userController',10)
                        let apiResponse = responce.generate(true,'data not saved',404,null)
                        reject(apiResponse)                    
                      }else{
                          let responseBody = {
                            authToken:newTokenDetails.authToken,
                            userDetails:tokenDetails.userDetails
                       }
                       resolve(responseBody) 
                          }
                      })
                  }          

                })
              })
        }
        
    
   

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiresponce = responce.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiresponce)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
    

    }


// end of the login function 


let logout = (req, res) => {
    AuthModel.remove({userId:req.query.userId}, (err,result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = responce.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = responce.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = responce.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
      })


} // end of the logout function.

   
module.exports={
        singup:singup,
        loginFunction: loginFunction,
          logout: logout,
          getAllUsers:getAllUsers,
          getSingleUser:getSingleUser,
          deleteUser:deleteUser
    }
