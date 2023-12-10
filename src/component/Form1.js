// Form1.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./form.css";
const Form1 = ({ onNext,setValue,setFormDisable,setOnNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!(onNext?.emailId ?? "") || !/\S+@\S+\.\S+/.test(onNext?.emailId ?? "")) {
      newErrors.emailId = "Enter a valid email address";
      valid = false;
    }

    if (
      !(onNext?.password ?? "") ||
      !/(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{8,}/.test(
        onNext?.password ?? ""
      )
    ) {
      newErrors.password =
        "Please enter valid password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
        let data = {
            ...onNext,
        }
        setOnNext(data)
      setValue(1);
      setFormDisable(prev=>({...prev,['formTwo']:false}))
    }
  };

  const onSave = ()=>{
    let data = {
        ...onNext,
        
    }
    setOnNext(data)
  }
  
  return (
    <div className="dc">
      <TextField
        label="Email"
        value={onNext?.emailId ?? ""}
        onChange={(e) => setOnNext(prev=>({...prev,['emailId']:e.target.value}))}
        error={!!errors.emailId}
        helperText={errors.emailId}
      />
      <TextField
        label="Password"
        type="password"
        value={onNext?.password ?? ""}
        onChange={(e) => setOnNext(prev=>({...prev,['password']:e.target.value}))}
        error={!!errors.password}
        helperText={errors.password}
      />
      <div>
      <Button disabled>Back</Button>
      <Button onClick={onSave}>Save</Button>
      <Button onClick={handleNext}>Save and Next</Button>
      </div>
    </div>
  );
};

export default Form1;
