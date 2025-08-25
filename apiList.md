# dev tinder APIs

##authRouter
-POST /signup
-POST /login
-POST /logout

##profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password


##connectionRequestRouter
-POST /request/send/status/:userId                     //interested or rejected
-POST /request/send/status/:requestId                  //accept or reject


##userRouter
GET /user/connections
GET /user/request
GET /feed/review/rejected/:requested

-status-interested , ignored, accept , reject