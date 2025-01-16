 const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(401).send("the admin is not authporized");
    } else {
       next();
    }
  };
  const userAuth = (req,res,next)=>{
    const token = "xz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(401).send("the user is not authporized");
    } else {
       next();
    }
  };

  module.exports = {adminAuth,userAuth};