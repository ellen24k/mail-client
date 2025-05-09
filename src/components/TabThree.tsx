import React from "react";
import ImapTab from "./Imap";

const API_URL = "http://localhost:8000/imap/naver";

const TabThree = () => <ImapTab apiUrl={API_URL} />;

export default TabThree;
