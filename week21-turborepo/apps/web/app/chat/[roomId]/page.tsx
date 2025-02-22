import Input from "@repo/ui/input";

// create a chat room component called bubble in packages/ui/src/bubble.tsx

export default function ChatRoom() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}> 
            <div>
            <h1>Chat Room</h1>
            </div>
            <div>
                <Input placeholder="Chat here please" size="small">
                </Input>
            </div>
        </div>
    );
}