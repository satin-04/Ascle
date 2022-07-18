import React, { useState } from "react";
import { ChatEngine, getOrCreateChat, ChatList } from "react-chat-engine";
import styles from "./Chat.module.css";
import { useEffect } from "react";
import axios from "axios";
import Add from "@mui/icons-material/Add";

function Chat() {
  
  const user_type = sessionStorage.getItem('user_type');
  const user_info = user_type ==='DOC' ? localStorage.getItem('docName'): localStorage.getItem("patFname");
  console.log(user_info);
  const [user_name, setUsername] = useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [user_name] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div style={styles}>
        <div className={styles.usersearch}>
          <div className={styles.inputfield}>
            <input
              placeholder="Username"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          
          <button className={styles.searchbutton} onClick={() => createDirectChat(creds)}><Add/></button>
          </div>
        </div>
      </div>
    );
  }
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    document.getElementsByClassName('ce-wrapper')[0].style.height = '85vh';
  }, []);

  return (
    <div style={styles}>
    <div className={styles.container}>
      <div className={styles.chatdiv}>
        <ChatEngine
          userName={user_info}
          userSecret="Password@1234"
          projectID="eb1eb0e1-66fe-43cf-bd25-864c53b74e9b"
          renderNewChatForm={(creds) => renderChatForm(creds)}
        >
          <ChatList />
        </ChatEngine>
      </div>
    </div>
    </div>
  );
}

export default Chat;
