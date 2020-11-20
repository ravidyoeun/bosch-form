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
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const NewsLetterSignup = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const history = useHistory();
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
            history.push("/success");
          }
        },

        (error) => {
          console.log("errr", error);
          alert("Sorry! You can't signup twice with the same email.");
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
  };

  return (
    <>
      <Container
        style={{ paddingTop: "60px", minHeight: "2000px", padding: "50px" }}
      >
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

            {/* <Form.Group controlId='ZipCOde'>
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
            </Form.Group> */}

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
                checked={termsOfUse}
              />
              <Form.Control.Feedback type='invalid'>
                Please agree to Terms of Use.
              </Form.Control.Feedback>
            </Form.Group>

            <ReCAPTCHA
              sitekey='6LcbROQZAAAAAItQ23coy43o0mkrIHY3NjcX39L2'
              onChange={onCaptchaChange}
            />
            <br />

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
      </Container>
    </>
  );
};

export default NewsLetterSignup;
