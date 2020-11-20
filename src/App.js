import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";

import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import NewsLetterSignup from "./components/Forms/newsletterSignup";
import FormVersion2 from "./components/Forms/formVersion2";
import SuccessPage from "./components/Success/success";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [confirmEmail, setConfirmEmailValue] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [notValidForm, setFormNotValid] = useState(true);
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

  const confirmEmailChange = (event) => {
    console.log("confirmEmail", event.target.value);
    setConfirmEmailValue(event.target.value);
  };

  const firstNameChange = (event) => {
    console.log("firstNameChange", event.target.value);
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    console.log("lastNameChange", event.target.value);
    setLastName(event.target.value);
  };
  const passwordChange = (event) => {
    console.log("password", event.target.value);
    setPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    console.log("confirmPassword", event.target.value);
    setConfirmPassword(event.target.value);
  };

  const streetAddressChange = (event) => {
    console.log("streetAddress", event.target.value);
    setStreetAddress(event.target.value);
  };

  const zipChange = (event) => {
    console.log("zipChange", event.target.value);
    setZipcode(event.target.value);
  };

  const cityChange = (event) => {
    console.log("cityChange", event.target.value);
    setCity(event.target.value);
  };

  const stateChange = (event) => {
    console.log("stateChange", event.target.value);
    if (event.target.value == "0") {
      setState("");
    } else {
      setState(event.target.value);
    }
  };

  const countryChange = (event) => {
    console.log("countryChange", event.target.value);
    setCountry(event.target.value);
  };

  const phoneNumberChange = (event) => {
    console.log("phoneNumberChange", event.target.value);
    setPhoneNumber(event.target.value);
  };

  const mobileNumberChange = (event) => {
    console.log("mobileNumberChange", event.target.value);
    setMobileNumber(event.target.value);
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
          zipCode: "",
        };

        console.log("payloadObj", payloadObj);
        await submitData(payloadObj);
      } else {
        alert("Security captcha is incorrect!");
      }
    }
    setValidated(true);

    // //VALIDATE
    // var errors = [];

    // //firstname
    // if (firstname === "") {
    //   errors.push("firstname");
    // }

    // //email
    // const expression = /\S+@\S+/;
    // var validEmail = expression.test(String(emailValue).toLowerCase());

    // if (!validEmail) {
    //   errors.push("emailValue");
    // }
    // setErrors(errors);

    // if (errors.length > 0) {
    //   return false;
    // } else {
    //   alert("everything good. submit form!");
    // }
  };

  const Home = () => {
    return <h2>Home</h2>;
  };

  const Form2 = () => {
    return <FormVersion2></FormVersion2>;
  };

  const Success = () => {
    return <SuccessPage></SuccessPage>;
  };

  return (
    <>
      {/* <Navbar expand='lg' className='topnavbar'></Navbar>
      <Navbar expand='lg' className='navbarcolor'>
        <Navbar.Brand href='https://www.bosch-home.com/' target='_blank'>
          <img
            alt='BOSCH - Invented for life'
            src='https://www.bosch-home.com/store/medias/sys_master/root/h72/h58/9828767989790/English-165px.jpg'
          />{" "}
        </Navbar.Brand>
      </Navbar> */}
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/form2'>
              <Form2 />
            </Route>
            <Route path='/success'>
              <Success />
            </Route>
            <Route path='/'>
              <NewsLetterSignup></NewsLetterSignup>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
