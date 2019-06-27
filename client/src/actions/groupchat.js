
export const ACTION_FETCH_GROUPS_MESSAGES = "ACTION_FETCH_GROUPS_MESSAGES"


const io = require('socket.io-client')
export const socket = io('http://localhost:3000')
// socket.on('connect', () => {
//    console.log('connected')
// })
//
//
// export function sendGroupMessage(message){
//   return dispatch => {
//     socket.emit('group-message',message)
//     socket.on('new-group-message', (message) => {
//       dispatch(receiveGroupMessage(message))
//     })
//   }
// }
//
// const receiveGroupMessage = (message) => ({
//    type: ACTION_FETCH_GROUPS_MESSAGES,
//    payload: message
// })
