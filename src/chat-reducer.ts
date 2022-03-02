import {api} from './api';

const initialState = {
  messages: [],
  typingUsers: []
}

export const chatReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'messages-received': {
      return {...state, messages: action.messages}
    }
    case 'new-message-received': {
      return {
        ...state, messages: [...state.messages, action.message],
        typingUsers: state.typingUsers.filter((u: any) => u.id !== action.message)
      }
    }
    case 'user-typing': {
      return {
        ...state,
        typingUsers: [...state.typingUsers.filter((u: any) => u.id !== action.user.id), action.message]
      }
    }
    default:
      return state
  }

};

const messagesReceived = (messages: any) => ({type: 'messages-received', messages})
const newMessageReceived = (message: any) => ({type: 'new-message-received', message})
const typingUserAdded = (user: any) => ({type: 'user-typing', user})

export const createConnection = () => (dispatch: any) => {
  api.createConnection()
  api.subscribe((messages: any, fn: () => void) => {
      dispatch(messagesReceived(messages))
      fn()
    },
    (message: any) => {
      dispatch(newMessageReceived(message))
    },
    (user: any) => {
      dispatch(typingUserAdded(user))
    })
}

export const destroyConnection = () => (dispatch: any) => {
  api.destroyConnection()
}

export const setClientName = (name: string) => (dispatch: any) => {
  api.sentName(name)
}
export const sendMessage = (messages: string) => (dispatch: any) => {
  api.sentMessage(messages)
}
export const typeMessage = () => (dispatch: any) => {
  api.typeMessage()
}