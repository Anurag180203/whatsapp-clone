import React, {useState,useEffect} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState();
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data()))
            );
        }
    },[roomId]);

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
                <div className='chat__headerInfo'>
                    <h3> {roomName} </h3>
                    <p>{messages?new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() : ""}</p>
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
                {messages?.map(message => (
                    <p className={`chat__message ${message.name === user.displayName
                     && 'chat__reciever'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
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