from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, client_id: int):
        await websocket.accept()

        for connection in self.active_connections:
            await connection.send_text(f"{client_id} entered the chat")
            
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, websocket: WebSocket, message: str, client_id: int):
        for connection in self.active_connections:
            if connection == websocket:
                await connection.send_text(f"You: {message}")
            else:
                await connection.send_text(f"{client_id}: {message}")

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(websocket, f"{data}", client_id)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(websocket, f"left the chat", client_id)
