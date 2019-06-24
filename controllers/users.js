'use strict'

module.exports = function(_,async,passport){
  return {
    setRouting: function(router){
      router.get('/login/status', this.loginStatus)
      
      router.post('/signup', this.signup)
      router.post('/login', this.login)
      router.post('/logout', this.logout)
    },
    signup : (req,res)=> {
        passport.authenticate('local-signup',function(err, user, info) {
          if (err) { return res.json( { isSignedUp:false, generalError:err } ) }
          if (info) { return res.json( { ...info, isSignedUp:false } ) }
          else if(user && !err && !info){
            return res.json( {isSignedUp:true} )
          }
        })(req, res)
    },
    login : (req,res)=> {
        passport.authenticate('local-signin',function(err, user, info) {
          if (err) { return res.json( { isLoggedIn:false, generalError:err } ) }
          if (info) { return res.json( { ...info, isLoggedIn:false } ) }
          else if(user && !err && !info){
            req.logIn(user, (err)=>{
              if(err) { return res.json( { isLoggedIn:false, error:err } ) }
              return res.json({isLoggedIn:true})
            })
          }
        })(req, res)
    },
    loginStatus : (req,res) => {
      if(req.isAuthenticated()){
        return res.json({isLoggedIn:true})
      } else return res.json({isLoggedIn:false})
    },
    logout : function(req,res){
      console.log(req.session);
      console.log(req.cookies);
      console.log(req.signedCookies);
      if(req.isAuthenticated()){
        Promise.resolve(
          req.session.destroy((err)=>{
            if (err) { return res.json( { isLoggedIn:true, generalError:err } ) }
            console.log('---> destroying session');
            req.logOut()
            console.log('---> logged out');
            req.user = null
          })
        ).then(()=>{
          console.log('promise resolved');
          return res.json({ isLoggedIn : false })
        })
      } else {
        return res.redirect('back')
      }
    },
  }
}
