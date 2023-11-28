import React, {useState,useEffect} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import db from "./firebase";

function Chat() {
    const [seed, setSeed] = useState('');
    const [input,setInput] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    },[roomId]);

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
                <div className='chat__headerInfo'>
                    <h3> {roomName} </h3>
                    <p>Last seen at ...</p>
                </div>

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                <p className='chat__message'>
                    <span className='chat__name'>Yo Yo</span>
                    Hey Guys
                    <span className='chat__timestamp'>3:52pm</span>
                </p>
                <p className={`chat__message ${true && 'chat__reciever'}`}>
                    <span className='chat__name'>Yo Yo</span>
                    Hey Guys
                    <span className='chat__timestamp'>3:52pm</span>
                </p>
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} 
                    type='text' 
                    onChange={e => setInput(e.target.value)} 
                    placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat