import React, { useRef, useEffect, useState, Component } from "react";
import * as ReactDOM from "react-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Card,
  CardColumns,
  Form,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Checkbox from "../Checkbox/Checkbox";
import placeholder from "../../assets/images/download.svg";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import * as EmailValidator from "email-validator";

const FormVersion2 = (props) => {
  const history = useHistory();
  const bg = require("../../assets/images/download.svg");
  const [emailValue, setEmailValue] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [boxOneSelect, setBoxOneSelect] = useState(true);
  const [boxTwoSelect, setBoxTwoSelect] = useState(true);
  const [boxThreeSelect, setBoxThreeSelect] = useState(true);
  const [boxFourSelect, setBoxFourSelect] = useState(true);
  const [boxFiveSelect, setBoxFiveSelect] = useState(true);
  const [boxSixSelect, setBoxSixSelect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [zipcode, setZipcode] = useState("");

  const [termsOfUse, setTermsOfUse] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  const schema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    zip: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    terms: yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  });

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const [captchaValue, setCaptchaValue] = useState("");
  const submitFormSubmission = async (event) => {
    event.preventDefault();
    console.log("submitting form values..", event);
  };

  const emailRegex = new RegExp(/\S+@\S+\.\S+/);
  const emailValidator = (value) =>
    emailRegex.test(value) ? "" : "Please enter a valid email.";
  const zipCodeValidator = (value) =>
    zipCodeTest(value) ? "" : "Please enter a valid 5 digit zip code.";

  const zipCodeTest = (value) => {
    console.log("zipCodeTest", value);
    if (value == undefined) {
      return false;
    }
    if (value.length != 5) {
      return false;
    } else {
      return true;
    }
  };
  const firstNameValidator = (value) =>
    nameTest(value) ? "" : "Please enter your first name.";
  const lastNameValidator = (value) =>
    nameTest(value) ? "" : "Please enter your last name.";
  const nameTest = (value) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  };
  // const EmailInput = (fieldRenderProps) => {
  //   const { validationMessage, visited, ...others } = fieldRenderProps;
  //   return (
  //     <div>
  //       <Input {...others} />
  //       {visited && validationMessage && <Error>{validationMessage}</Error>}
  //     </div>
  //   );
  // };

  // const firstNameInput = (fieldRenderProps) => {
  //   const { validationMessage, visited, ...others } = fieldRenderProps;
  //   return (
  //     <div>
  //       <Input {...others} />
  //       {visited && validationMessage && <Error>{validationMessage}</Error>}
  //     </div>
  //   );
  // };

  // const lastNameInput = (fieldRenderProps) => {
  //   const { validationMessage, visited, ...others } = fieldRenderProps;
  //   return (
  //     <div>
  //       <Input {...others} />
  //       {visited && validationMessage && <Error>{validationMessage}</Error>}
  //     </div>
  //   );
  // };

  // const ZipCodeInput = (fieldRenderProps) => {
  //   const { validationMessage, visited, ...others } = fieldRenderProps;
  //   console.log("fieldRenderProps", fieldRenderProps);

  //   return (
  //     <div>
  //       <Input {...others} />
  //       {visited && validationMessage && <Error>{validationMessage}</Error>}
  //     </div>
  //   );
  // };
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
    console.log("payload", payload);
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

            history.push({
              pathname: "/confirmation",
              state: { links: downloadLinks },
            });
          }
        },

        (error) => {
          console.log("errr", error);
        }
      );
  };

  const selectCard = (param) => {
    if (param == 1) {
      setBoxOneSelect(!boxOneSelect);

      if (boxOneSelect) {
        setDownloadLinks(downloadLinks.concat(1));
      } else {
        removeItem(1);
      }
    }
    if (param == 2) {
      setBoxTwoSelect(!boxTwoSelect);
      if (boxTwoSelect) {
        setDownloadLinks(downloadLinks.concat(2));
      } else {
        removeItem(2);
      }
    }
    if (param == 3) {
      setBoxThreeSelect(!boxThreeSelect);
      if (boxThreeSelect) {
        setDownloadLinks(downloadLinks.concat(3));
      } else {
        removeItem(3);
      }
    }
    if (param == 4) {
      setBoxFourSelect(!boxFourSelect);
      if (boxFourSelect) {
        setDownloadLinks(downloadLinks.concat(4));
      } else {
        removeItem(4);
      }
    }
    if (param == 5) {
      setBoxFiveSelect(!boxFiveSelect);
      if (boxFiveSelect) {
        setDownloadLinks(downloadLinks.concat(5));
      } else {
        removeItem(5);
      }
    }
    if (param == 6) {
      setBoxSixSelect(!boxSixSelect);
      if (boxSixSelect) {
        setDownloadLinks(downloadLinks.concat(6));
      } else {
        removeItem(6);
      }
    }
    console.log("downloadLinks", downloadLinks);
    // setDownloadLinks(downloadLinkObj);
  };

  const removeItem = (e) => {
    var array = [...downloadLinks];
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setDownloadLinks(array);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     if (captchaValue) {
  //       event.preventDefault();
  //       var payloadObj = {
  //         promoIDExt: "10A129D3-F78B-4E1B-9C21-B65353B9E456",
  //         firstName: firstname,
  //         lastName: lastname,
  //         email: emailValue,
  //         zipCode: zipcode,
  //       };

  //       console.log("payloadObj", payloadObj);
  //       await submitData(payloadObj);
  //     } else {
  //       alert("Security captcha is incorrect!");
  //     }
  //   }
  //   setValidated(true);
  // };
  const handleSubmit = async (dataItem) => {
    console.log("dataItem", dataItem);
    if (captchaValue) {
      setIsLoading(true);
      var payloadObj = {
        promoIDExt: "10A129D3-F78B-4E1B-9C21-B65353B9E456",
        firstName: dataItem.firstName,
        lastName: dataItem.lastName,
        email: dataItem.email,
        zipCode: dataItem.zip,
      };

      await submitData(payloadObj);
    } else {
      alert("Security captcha is incorrect!");
    }

    setIsLoading(false);
  };

  const ShowLoadText = () => {
    if (isLoading) {
      return "Loading...";
    } else {
      return "Submit";
    }
  };
  return (
    <>
      <Container
        style={{ paddingTop: "60px", minHeight: "2000px", padding: "50px" }}
      >
        <Row>
          <h3>Form Version 2</h3>
        </Row>

        <Row>
          <Formik
            style={{ minWidth: "100%" }}
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              zip: "",
              terms: false,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                style={{ minWidth: "100%" }}
              >
                <Form.Group controlId='Email'>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback type='invalid'>
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='firstName'>
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />

                  <Form.Control.Feedback type='invalid'>
                    Please provide your first name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />

                  <Form.Control.Feedback type='invalid'>
                    Please provide your last name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='zipCode'>
                  <Form.Label>Zip Code (5 digits) *</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    name='zip'
                    value={values.zip}
                    onChange={handleChange}
                    isInvalid={!!errors.zip}
                  />

                  <Form.Control.Feedback type='invalid'>
                    Please provide a valid US zip code that is 5 digits long.
                  </Form.Control.Feedback>
                </Form.Group>

                <p>
                  Select your favorite kitchen suite(s) below to access your
                  downloadable copy: *
                </p>
                <CardColumns>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(1)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxOneSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 1</p>
                      </blockquote>
                    </Card>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(2)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxTwoSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 2</p>
                      </blockquote>
                    </Card>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(3)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxThreeSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 3</p>
                      </blockquote>
                    </Card>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(4)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxFourSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 4</p>
                      </blockquote>
                    </Card>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(5)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxFiveSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 5</p>
                      </blockquote>
                    </Card>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => selectCard(6)}
                  >
                    <Card
                      bg='secondary'
                      text='white'
                      className={`${
                        !boxSixSelect
                          ? "highlightSelection text-center p-3"
                          : "text-center p-3"
                      }`}
                    >
                      <blockquote className='blockquote mb-0 card-body'>
                        <p>Kitchen Suite 6</p>
                      </blockquote>
                    </Card>
                  </a>
                </CardColumns>
                <br></br>
                <ReCAPTCHA
                  sitekey='6LcbROQZAAAAAItQ23coy43o0mkrIHY3NjcX39L2'
                  onChange={onCaptchaChange}
                />
                <br />

                <Form.Group controlId='AgreeToTerms'>
                  <Form.Check
                    required
                    name='terms'
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    id='validationFormik0'
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
                          Terms of Use
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
                          Privacy Policy
                        </a>{" "}
                        of BSH Home Appliances Corporation - Bosch, 1901 Main
                        Street, Suite 600, Irvine, CA 92614. I understand and
                        accept them.
                      </div>
                    }
                    size='lg'
                  />

                  {/* <Form.Control.Feedback type='invalid'>
                    Please agree to Terms of Use.
                  </Form.Control.Feedback> */}
                </Form.Group>
                <br></br>

                <Button
                  variant='primary'
                  type='submit'
                  className='float-left'
                  size='lg'
                  type='submit'
                >
                  <ShowLoadText></ShowLoadText>
                </Button>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </>
  );
};

export default FormVersion2;
