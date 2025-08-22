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
-POST /request/send/status/:userId



-POST /request/review/accept/:requestId
-POST /request/review/reject/:requestId


##userRouter
GET /user/connections
GET /user/request
GET /feed/review/rejected/:requested

-status-interested , ignored, accept , reject