// import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { environment } from '../../environments/environment';
// import { catchError, tap, switchAll } from 'rxjs/operators';
// import { EMPTY, Subject } from 'rxjs';
// export const WS_ENDPOINT = environment.wsEndpoint;

// @Injectable({
//   providedIn: 'root',
// })
// export class WebsocketService {
//   private socket$!: WebSocketSubject<any>;
//   private messagesSubject$ = new Subject();
//   public messages$ = this.messagesSubject$.pipe(
//     switchAll<any>(),
//     catchError((e) => {
//       throw e;
//     })
//   );

//   public connect() {
//     if (!this.socket$ || this.socket$.closed) {
//       this.socket$ = this.getNewWebSocket();
//       const messages = this.socket$.pipe(
//         tap({
//           error: (error) => console.log(error),
//         }),
//         catchError((_) => EMPTY)
//       );
//       this.messagesSubject$.next(messages);
//       console.warn('socket connected');
//     }
//   }

//   private getNewWebSocket() {
//     return webSocket(WS_ENDPOINT);
//   }
//   sendMessage(msg: any) {
//     this.socket$.next(msg);
//     console.warn('msg sent: ', msg);
//   }
//   close() {
//     this.socket$.complete();
//     console.warn('socket closed');
//   }
// }
