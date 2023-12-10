import React, { useState } from "react";
import VerticalTabs from "../component/utils/Tabs";
import "../component/form.css";
export default function Home() {
  const [onNext, setOnNext] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    
  });
  
  return (
    <div className="main-container">
      <VerticalTabs onNext={onNext} setOnNext={setOnNext} />
    </div>
  );
}
