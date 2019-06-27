import {
         // ACTION_LOGIN_FAILURE,
         // ACTION_SIGNUP_FAILURE,
         ACTION_LOADING,
         ACTION_FLUSH_ERROR_MESSAGE,
         ACTION_LOGIN_SUCCESS,
         ACTION_SIGNUP_SUCCESS,
         ACTION_FETCH_GROUPS_SUCCESS,
         ACTION_FETCH_FAILURE,
         ACTION_LOGOUT_SUCCESS } from '../actions/index'

import { ACTION_FETCH_GROUPS_MESSAGES } from '../actions/groupchat'

const initialState = {
  isLoading:false,
  isLoggedIn: false,
  isSignedUp:false,
  profileDetails:[],
  friends:[],
  chats:[],
  groups:[],
  groupchat:{},
  loginError:null,
  signupError:null,
  generalError:null
}

export default function(state = initialState, action){
  
  switch (action.type) {

    case ACTION_LOADING:
      return {
        ...state,
        isLoading:true
      }
      break;
    case ACTION_FLUSH_ERROR_MESSAGE:
      return {
        ...state,
        loginError:null,
        signupError:null,
        generalError:null,
        isSignedUp:false
      }
      break;
    case ACTION_LOGIN_SUCCESS:
      if(action.payload.isLoggedIn){
        return {
          ...state,
          isLoggedIn:true,
          isLoading:false,
          isSignedUp:false,
          loginError:null,
          signupError:null
        }
      } else if(action.payload.error) {
        return {
          ...state,
          isLoading:false,
          loginError:action.payload.error.message
        }
      }
      break;
    case ACTION_SIGNUP_SUCCESS:
      if(action.payload.isSignedUp){
        return {
          ...state,
          isSignedUp:true,
          isLoading:false,
          loginError:null,
          signupError:null
        }
      } else if(action.payload.error) {
        return {
          ...state,
          isLoading:false,
          signupError:action.payload.error.message
        }
      }
      break;
    case ACTION_FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading:false,
        ...action.payload,
        groupchat: Object.assign({},...action.payload.groups.map((group)=> {return {[group.fullname]:[]}}))
      }
      break;
    case ACTION_LOGOUT_SUCCESS:
        return {
          ...state,
          isLoading:false,
          ...action.payload
        }
        break;
    case ACTION_FETCH_FAILURE:
        return {
          ...state,
          isLoading:false,
          ...action.payload
        }
        break;
    case ACTION_FETCH_GROUPS_MESSAGES:
        return {
          ...state,
          isLoading : false,
          groupchat : { ...state.groupchat, [action.payload.group] : [ ...state.groupchat[action.payload.group.toString()], { user : action.payload.user, message : action.payload.message, time : Date.now() } ] }
        }
        break;
    // case ACTION_LOGIN_FAILURE:
    //   return {
    //     ...state,
    //     isLoading:false,
    //     generalError:action.payload.error
    //   }
    //   break;
    // case ACTION_SIGNUP_FAILURE:
    //   return {
    //     ...state,
    //     isLoading:false,
    //     generalError:action.payload.error
    //   }
    //   break;
    default:
      return state
  }
}
