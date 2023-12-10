// Form3.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./form.css";
const Form3 = ({ onNext, setValue, setFormDisable, value, setOnNext }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Country Code validation
    if (!onNext?.countryCode) {
      newErrors.countryCode = "Select a country code";
      valid = false;
    }

    // Phone Number validation
    if (!onNext?.phoneNumber || !/^\d{10}$/.test(onNext?.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
      valid = false;
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      newErrors.acceptTerms = "Please accept terms and conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  console.log('er',errors,acceptTerms);
  const handleSave = async () => {  
    try {
      if (validateForm()) {
        setErrors({})
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
          body: JSON.stringify(onNext),
        });

        if (response.ok) {
          window.location.href = "/post";
        } else {
          throw new Error("Failed to submit form data");
        }
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const onSave = () => {
    let data = {
      ...onNext,
    };
    setOnNext(data);
  };

  return (
    <div className="dc">
      <div>
        <FormControl error={!!errors.countryCode} sx={{width:'150px',mr:'10px'}}>
          <InputLabel>Country Code</InputLabel>
          <Select
            value={onNext?.countryCode}
            onChange={(e) =>
              setOnNext((prev) => ({
                ...prev,
                ["countryCode"]: e.target.value,
              }))
            }
          >
            <MenuItem value="+91">India (+91)</MenuItem>
            <MenuItem value="+1">America (+1)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Phone Number"
          value={onNext?.phoneNumber}
          onChange={(e) =>
            setOnNext((prev) => ({ ...prev, ["phoneNumber"]: e.target.value }))
          }
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
      </div>
      <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => {
                setAcceptTerms(e.target.checked)
                if(e.target.checked && errors?.acceptTerms) {
                    setErrors(prev=>({...prev,'acceptTerms':""}))
                }
            }}
          />
        }
        label="Accept Terms and Conditions"
        error={!!errors.acceptTerms}
        helperText={errors.acceptTerms}
      />
        <div className="error">{errors.acceptTerms ?? acceptTerms}</div>
        </div>
      <div>
        <Button
          onClick={() => {
            setValue(1);
            onSave();
          }}
        >
          Back
        </Button>
        <Button onClick={handleSave}>Save</Button>
        <Button disabled>Save and Next</Button>
      </div>
      {/* <Button onClick={handleSubmission}>Submit</Button> */}
    </div>
  );
};

export default Form3;
