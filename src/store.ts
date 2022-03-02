import {applyMiddleware, combineReducers, createStore} from 'redux';
import {chatReducer} from './chat-reducer';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  chat: chatReducer
})
export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))