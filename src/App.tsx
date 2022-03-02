import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {
  createConnection,
  destroyConnection,
  sendMessage,
  setClientName, typeMessage
} from './chat-reducer';
import {AppStateType} from './store';


function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')


  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(createConnection())
    return () => {
      dispatch(destroyConnection)
    } // for disconnect from connect io(componentWillUnmount)
  }, [dispatch]);
  return (
      <div className={style.app}>
        <div className={style.name}> Enter your name please and push the button</div>
        <input value={name} onChange={(e) => setName(e.currentTarget.value)}/>
        <button onClick={() => {
          dispatch(setClientName(name))
          setName('')
        }}> Change name
        </button>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          height: '300px',
          width: '300px',
          overflowY: 'scroll',
        }}>
          {messages.map((m: any) => {
            return <div key={m.id}><b>{m.user.name}:</b> {m.message}</div>
          })}
          {typingUsers.map((m: any) => {
            return <div key={m.id}><b>{m.name}:</b> ...</div>
          })}
        </div>
        <textarea value={message}
                  onKeyPress={() => {
                    dispatch(typeMessage())
                  }}

                  onChange={(e) => setMessage(e.currentTarget.value)}/>
        <button onClick={() => {
          dispatch(sendMessage(message))
          setMessage('')
        }}>Send message
        </button>
      </div>
  );
}

export default App;
