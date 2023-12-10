// Form2.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import "./form.css";
const Form2 = ({ onNext,setValue,setFormDisable,setOnNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // First Name validation
    if (!(onNext?.firstName ?? "") || !/^[A-Za-z]{2,50}$/.test(onNext?.firstName ?? "")) {
      newErrors.firstName = 'Enter a valid first name';
      valid = false;
    }

    // Last Name validation
    if ((onNext?.lastName ?? "") && !/^[A-Za-z]*$/.test(onNext?.lastName ?? "")) {
      newErrors.lastName = 'Enter a valid last name';
      valid = false;
    }

    // Address validation
    if (!(onNext?.address ?? "") || (onNext?.address ?? "").length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
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
        setValue(2)
        setFormDisable(prev=>({...prev,['formThree']:false}))
    }
  };
  const onSave = ()=>{
    let data = {
        ...onNext,
        
    }
    setOnNext(data)
  }
  return (
    <div className='dc'>
      <TextField
        label="First Name"
        value={onNext?.firstName ?? ""}
        onChange={(e) => setOnNext(prev=>({...prev,['firstName']:e.target.value}))}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={onNext?.lastName ?? ""}
        onChange={(e) => setOnNext(prev=>({...prev,['lastName']:e.target.value}))}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="Address"
        value={onNext?.address ?? ""}
        onChange={(e) => setOnNext(prev=>({...prev,['address']:e.target.value}))}
        error={!!errors.address}
        helperText={errors.address}
      />
      <div>
        <Button onClick={()=>{
            setValue(0)
            onSave()
        }}>Back</Button>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={handleNext}>Save and Next</Button>
      </div>
      
    </div>
  );
};

export default Form2;
