import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material';
import db from './firebase';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SidebarChat( {id, name, addNewChat} ) {

  const [seed, setSeed] = useState('');

  useEffect( () => {
    setSeed(Math.floor(Math.random() * 5000));
  },[]);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat room');
    
    if(roomName) {
      db.collection('rooms').add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='SidebarChat'>
        <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
        <div className='SidebarChat__info'>
            <h2>{name}</h2>
            <p>last message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
    className='SidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat;