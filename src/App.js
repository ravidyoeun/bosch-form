import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "./components/Footer";
function onChange(value) {
  console.log("Captcha value:", value);
}

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
  const submitFormSubmission = async (event) => {
    event.preventDefault();
    console.log("submitting form values..", event);
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
    setState(event.target.value);
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
    console.log("termsofUseChange", event.target.value);
    setTermsOfUse(event.target.value);
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
    }
    setValidated(true);
    var payloadObj = {
      promoIDExt: "3f94e6d0-018e-4d18-bc24-47c6097fa6a0",
      firstName: firstname,
      lastName: lastname,
      email: emailValue,
      zipCode: zipcode,
    };

    console.log("payloadObj", payloadObj);
    await submitData(payloadObj);
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

  return (
    <>
      <Navbar expand='lg' className='topnavbar'></Navbar>
      <Navbar expand='lg' className='navbarcolor'>
        <Navbar.Brand href='https://www.bosch-home.com/' target='_blank'>
          <img
            alt='BOSCH - Invented for life'
            src='https://www.bosch-home.com/store/medias/sys_master/root/h72/h58/9828767989790/English-165px.jpg'
          />{" "}
        </Navbar.Brand>
      </Navbar>
      <Container style={{ paddingTop: "60px", minHeight: "2000px" }}>
        <Row>
          <h3>Please complete these fields.</h3>
        </Row>
        <Row>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{ minWidth: "100%" }}
          >
            <Form.Group controlId='Email'>
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                required
                type='email'
                size='lg'
                onChange={emailChange}
                value={emailValue}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='ConfirmEmail'>
              <Form.Label>Confirm Email Address *</Form.Label>
              <Form.Control
                required
                type='email'
                size='lg'
                onChange={confirmEmailChange}
                value={confirmEmail}
              />
              <Form.Control.Feedback type='invalid'>
                Please confirm your email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='Password'>
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type='password'
                size='lg'
                required
                onChange={passwordChange}
                value={password}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='ConfirmPassword'>
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type='password'
                size='lg'
                required
                onChange={confirmPasswordChange}
                value={confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='FirstName'>
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type='text'
                size='lg'
                required
                onChange={firstNameChange}
                value={firstname}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide your first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='LastName'>
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type='text'
                size='lg'
                required
                onChange={lastNameChange}
                value={lastname}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide your last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='StreetAddress'>
              <Form.Label>Street Address *</Form.Label>
              <Form.Control
                type='text'
                size='lg'
                required
                onChange={streetAddressChange}
                value={streetAddress}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide street address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='ZipCOde'>
              <Form.Label>Zip Code (5 digits) *</Form.Label>
              <Form.Control
                type='number'
                size='lg'
                required
                onChange={zipChange}
                value={zipcode}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide zip code.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='City'>
              <Form.Label>City *</Form.Label>
              <Form.Control
                type='text'
                size='lg'
                required
                onChange={cityChange}
                value={city}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='State'>
              <Form.Label>State *</Form.Label>
              <Form.Control
                as='select'
                size='lg'
                required
                onChange={stateChange}
                value={state}
              >
                <option value='0'>Please make a selection.</option>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please select a state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='Country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                placeholder='US'
                disabled
                type='text'
                size='lg'
                onChange={countryChange}
                value={country}
              />
            </Form.Group>
            <Form.Group controlId='PhoneNumber'>
              <Form.Label>
                Phone Number: This field accepts numbers only and cannot begin
                with 0 or 1 *
              </Form.Label>

              <Form.Control
                type='number'
                size='lg'
                required
                onChange={phoneNumberChange}
                value={phoneNumber}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='MobileNumber'>
              <Form.Label>
                Mobile Number: This field accepts numbers only and cannot begin
                with 0 or 1 *
              </Form.Label>
              <Form.Control
                type='number'
                size='lg'
                required
                onChange={mobileNumberChange}
                value={mobileNumber}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid mobile number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='AgreeToTerms'>
              <Form.Check
                type='checkbox'
                label={
                  <div>
                    I have read the{" "}
                    <a
                      href='https://bosch-home.com/us/about/imprint/legal'
                      target='_blank'
                      style={{
                        color: "rgb(" + 0 + "," + 123 + "," + 255 + ")",
                        backgroundColor:
                          "rgb(" + 255 + "," + 255 + "," + 255 + ")",
                        fontWeight: "600",
                      }}
                    >
                      <bold>Terms of Use</bold>
                    </a>{" "}
                    and{" "}
                    <a
                      href='https://bosch-home.com/us/about/imprint/privacypolicy'
                      target='_blank'
                      style={{
                        color: "rgb(" + 0 + "," + 123 + "," + 255 + ")",
                        backgroundColor:
                          "rgb(" + 255 + "," + 255 + "," + 255 + ")",
                        fontWeight: "600",
                      }}
                    >
                      <bold>Privacy Policy</bold>
                    </a>{" "}
                    of BSH Home Appliances Corporation - Bosch, 1901 Main
                    Street, Suite 600, Irvine, CA 92614. I understand and accept
                    them.
                  </div>
                }
                size='lg'
                required
                onChange={termsofUseChange}
                value={termsOfUse}
              />
              <Form.Control.Feedback type='invalid'>
                Please agree to Terms of Use.
              </Form.Control.Feedback>
            </Form.Group>
            <ReCAPTCHA
              sitekey='6LcbROQZAAAAAItQ23coy43o0mkrIHY3NjcX39L2'
              onChange={onChange}
            />
            <Button
              variant='primary'
              type='submit'
              className='float-right'
              size='lg'
            >
              Submit
            </Button>
          </Form>
        </Row>
        <Row></Row>
        <Footer></Footer>
      </Container>
    </>
  );
};

export default App;
