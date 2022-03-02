import {io} from 'socket.io-client';

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }
// interface ClientToServerEvents {
//   hello: () => void;
// }
//
// interface InterServerEvents {
//   ping: () => void;
// }
//
// interface SocketData {
//   name: string;
//   age: number;
// }
export const api = {
  // socket: null as null | Socket<ServerToClientEvents, ClientToServerEvents>,
  socket: null as null | any,
  createConnection() {
    this.socket = io('https://samurai-chat-backio.herokuapp.com/');
    // this.socket = io('http://localhost:3009');
  },

  subscribe(initMessagesHandler: (messages: any, fn: () => void) => void, // handlers for BLL
    newMessageSentHandler: (message: any) => void,                        // if messages coming using this callback for treatment<=
    userTypingHandler: (user: any) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandler) // this callback said: 'if on server happen event 'init...'
    this.socket?.on('new-message-sent', newMessageSentHandler)      // and we get messages => put them in our callback initMessagesH
    this.socket?.on('user-typed-message', userTypingHandler)
  },
  destroyConnection() {
    this.socket?.disconnect()
    this.socket = null
  },
  sentName(name: string) {
    this.socket?.emit('client-name-sent', name)
  },
  sentMessage(message: string) {
    this.socket?.emit('client-message-sent', message, (error: string | null) => {
      if(error) alert(error)
    })
  },
  typeMessage() {
    this.socket?.emit('client-typed')
  }
}