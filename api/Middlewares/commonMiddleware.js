
export function localVariables(req,res,next) {
  req.app.locals = {
    OTP:null,
    EMAIL:null,
    resetSession:false,
  }

  next()
}