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
import { useLocation } from "react-router-dom";
const Confirmation = (props) => {
  const location = useLocation();
  const [downloadLinks, setDownloadLinks] = useState([]);
  useEffect(() => {
    console.log("location.state", location.state.links); // result: 'some_value'
    setDownloadLinks(location.state.links);
  }, [location]);

  return (
    <Jumbotron style={{ textAlign: "center", backgroundColor: "white" }}>
      <h1>Thank You!</h1>
      <p>
        Thank you for your interest in Bosch Home Appliances and viewing our
        Virtual Experience Tour.
      </p>
      <ul>
        {downloadLinks.length > 0
          ? downloadLinks.map(function (name, index) {
              return <li style={{ listStyle: "none" }}>{name}</li>;
            })
          : null}
      </ul>
    </Jumbotron>
  );
};

export default Confirmation;
