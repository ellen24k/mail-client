import React from "react";
import ImapTab from "./Imap";

const API_URL = "http://localhost:8000/imap/gmail";

const TabTwo = () => <ImapTab apiUrl={API_URL} />;

export default TabTwo;