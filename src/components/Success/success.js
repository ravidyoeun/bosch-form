import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Jumbotron,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Success = (props) => {
  const [emailValue, setEmailValue] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [zipcode, setZipcode] = useState("");

  const [termsOfUse, setTermsOfUse] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  const [captchaValue, setCaptchaValue] = useState("");
  const submitFormSubmission = async (event) => {
    event.preventDefault();
    console.log("submitting form values..", event);
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    if (value) {
      setCaptchaValue(value);
    } else {
      setCaptchaValue("");
    }
  };

  const emailChange = (event) => {
    console.log("email change", event.target.value);
    setEmailValue(event.target.value);
  };

  const firstNameChange = (event) => {
    console.log("firstNameChange", event.target.value);
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    console.log("lastNameChange", event.target.value);
    setLastName(event.target.value);
  };

  const zipChange = (event) => {
    console.log("zipChange", event.target.value);
    setZipcode(event.target.value);
  };

  const termsofUseChange = (event) => {
    console.log("termsofUseChange", event.target.checked);

    setTermsOfUse(event.target.checked);
  };

  const hasError = (key) => {
    console.log("errors", errors);
    console.log("key", key);

    return errors.indexOf(key) !== -1;
  };

  const handleInputChange = (event) => {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
  };

  const submitData = async (payload) => {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://www.bshpersona.com/personaAPI/data/LeadAPISubmitData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log("result returned", result);
            //redirect
          }
        },

        (error) => {
          console.log("errr", error);
        }
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (captchaValue) {
        event.preventDefault();
        var payloadObj = {
          promoIDExt: "10A129D3-F78B-4E1B-9C21-B65353B9E456",
          firstName: firstname,
          lastName: lastname,
          email: emailValue,
          zipCode: zipcode,
        };

        console.log("payloadObj", payloadObj);
        await submitData(payloadObj);
      } else {
        alert("Security captcha is incorrect!");
      }
    }
    setValidated(true);
  };

  return (
    <Jumbotron style={{ textAlign: "center", backgroundColor: "white" }}>
      <h1>Thank You!</h1>
      <p>Your information was successfully sent to us.</p>
    </Jumbotron>
  );
};

export default Success;
