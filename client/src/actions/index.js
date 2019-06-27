export const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS'
export const ACTION_LOGOUT_SUCCESS = 'ACTION_LOGOUT_SUCCESS'
export const ACTION_SIGNUP_SUCCESS = 'ACTION_SIGNUP_SUCCESS'
export const ACTION_LOADING = 'ACTION_LOADING'
export const ACTION_FETCH_GROUPS_SUCCESS = 'ACTION_FETCH_GROUPS_SUCCESS'
export const ACTION_FETCH_FAILURE = 'ACTION_FETCH_FAILURE'
export const ACTION_FLUSH_ERROR_MESSAGE = 'ACTION_FLUSH_ERROR_MESSAGE'

export function loginAction({userName,password}){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/login', {
  		method: 'POST',
      credentials: 'include',
  		headers: {
  			'Content-Type': 'application/json',
  		},
      body:JSON.stringify({userName,password})
  	})
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch(loginSuccess(data) ) )
          .catch(error => dispatch( fetchFailed(error) ) )
  }
}

export function logoutAction(){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/logout', {
  		method: 'POST',
      credentials: 'include',
  		headers: {
  			'Content-Type': 'application/json',
  		}
  	})
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch( logoutSuccess(data) ) )
          .catch( error => dispatch( fetchFailed(error) ) )
  }
}

export function signupAction({userName,userEmail,fullName,password}){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/signup', {
  		method: 'POST',
      credentials: 'include',
  		headers: {
  			'Content-Type': 'application/json',
  		},
      body:JSON.stringify({userName,userEmail,fullName,password})
  	})
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch( signupSuccess(data) ) )
          .catch( error => dispatch( fetchFailed(error) ) )
  }
}

export function fetchGroupsAction(){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/groups')
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch( fetchGroupsSuccess( { groups : data } ) ) )
          .catch( error => dispatch( fetchFailed(error) ) )
  }
}

export function joinGroupAction(id){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/join/group', {
  		method: 'POST',
      credentials: 'include',
  		headers: {
  			'Content-Type': 'application/json',
  		},
      body:JSON.stringify({id})
  	})
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch( signupSuccess(data) ) )
          .catch( error => dispatch( fetchFailed(error) ) )
  }
}

export function checkLoginStatusAction(){
  return dispatch =>{
    dispatch(isLoading())
    fetch('/login/status')
    .then(handleErrors)
      .then( res => res.json() )
        .then( data => dispatch( loginSuccess(data) ) )
          .catch(error => dispatch( fetchFailed(error) ) )
  }
}

export const isLoading = () =>({
      type:ACTION_LOADING
})

export const loginSuccess = (data) =>({
      type:ACTION_LOGIN_SUCCESS,
      payload: data
})

export const signupSuccess = (data) =>({
      type:ACTION_SIGNUP_SUCCESS,
      payload: data
})

export const fetchGroupsSuccess = (data) =>({
      type:ACTION_FETCH_GROUPS_SUCCESS,
      payload: data
})

export const fetchFailed = (error) =>({
      type:ACTION_FETCH_FAILURE,
      payload: { error }
})

export const flushErrorMessageAction = () =>({
      type:ACTION_FLUSH_ERROR_MESSAGE
})

export const logoutSuccess = (data) =>({
      type:ACTION_LOGOUT_SUCCESS,
      payload: data
})

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
