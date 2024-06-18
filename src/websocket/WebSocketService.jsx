import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.client = null;
    }

    connect(gameId, onMessageReceived) {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => {
                console.log(new Date(), str);
            }
        });

        this.client.onConnect = () => {
            console.log('Connected to WebSocket');
            this.client.subscribe(`/game/${gameId}`, (data) => {
                const scoreUpdate = JSON.parse(data.body);
                onMessageReceived(scoreUpdate);
            });
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.client.onWebSocketClose = () => {
            console.log('WebSocket connection closed');
        };

        this.client.onWebSocketError = (error) => {
            console.error('WebSocket error:', error);
        };

        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            console.log('Disconnected from WebSocket');
        }
    }
}

export default new WebSocketService();
