import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FinalForm() {
  var name;
  var email;
  var color;
  var country;
  var lat;
  var long;
  name = sessionStorage.getItem("name");
  email = sessionStorage.getItem("email");
  color = sessionStorage.getItem("color");
  country = sessionStorage.getItem("country");
  lat = sessionStorage.getItem("lat");
  long = sessionStorage.getItem("long");

  const [temp, setTemp] = useState();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  console.log(typeof country);
  // console.log(long);

  useEffect(() => {
    const latlong = axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9cfc81d9959a43e318dd2820856c2ec6`
      )
      .then(function (latlong) {
        setTemp(latlong.data.main.temp);
      });
  }, []);

  function handleSubmit() {
    sessionStorage.clear();
    Swal.fire("Submitted Successfully ", "", "success");
    navigate("/");
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>What is Your Name? </Form.Label>
            <Form.Control type="text" value={name} placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>What is your Country?</Form.Label>
            <Form.Control type="text" value={country} placeholder="Country" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>What is your Email?</Form.Label>
            <Form.Control type="text" value={email} placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>What is Your favourite color?</Form.Label>
            <Form.Control type="text" value={color} placeholder="Color" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Temperature of the Capital?</Form.Label>
            <Form.Control type="text" value={temp} placeholder="Temperature" />
          </Form.Group>

          <Button
            onClick={handleSubmit}
            style={{ margin: "5px" }}
            variant="success"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default FinalForm;
