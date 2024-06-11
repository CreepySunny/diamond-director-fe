// src/WebSocketService.js
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
    }

    connect(onMessageReceived) {
        const socket = new SockJS('/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });
    }

    subscribe(gameId, onMessageReceived) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.subscribe(`/topic/game/${gameId}`, (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        } else {
            console.error('WebSocket connection is not established.');
        }
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            console.log('Disconnected from WebSocket');
        }
    }
}

export default new WebSocketService();
