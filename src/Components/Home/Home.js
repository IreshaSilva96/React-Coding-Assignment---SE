import { Button, Form, Container, Spinner } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [countrylist, setCountryList] = useState([]);
  const navigate = useNavigate();

  var namess;
  var lat;
  var long;

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { name, country } = form;
    const newErrors = {};

    //NAME ERROS
    if (!name || name.trim() == "") {
      if (!namess) {
        newErrors.name =
          "Name must contain at least your first name and last name!";
      }
    }

    if (!country || country.trim() == "") {
      newErrors.country = "Cannot be empty!";
    }

    return newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(form.country);
      const name = form.name;
      const country = form.country;

      const response1 = await axios
        .get("https://restcountries.com/v2/name/" + form.country)
        .then(function (response) {
          console.log("Iam", response.data[0].latlng);
          // setlat(response.data[0].latlng);
          console.log(typeof response.data[0].latlng[0]);
          // Filtered Column Names
          lat = response.data[0].latlng[0];
          long = response.data[0].latlng[1];

          // Filtered Values

          // setLong(response.data[0].latlng[1]);
        });

      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("long", long);

      if (sessionStorage.getItem("country")) {
        sessionStorage.clear("country");
        sessionStorage.setItem("country", form.country);
      } else if (sessionStorage.getItem("name")) {
        sessionStorage.clear("name");
        sessionStorage.setItem("name", form.name);
      } else {
        sessionStorage.setItem("name", form.name);
        sessionStorage.setItem("country", form.country);
      }
      navigate("/formemail");
    }
  };
  console.log(long);

  // Get Countries

  async function getData() {}

  useEffect(() => {
    setIsPending(true);

    console.log("U", lat);
    const response = axios
      .get("https://restcountries.com/v2/all")
      .then(function (response) {
        setCountryList(response.data);
      });
    getData();
  }, []);

  return (
    <div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>What is Your Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={sessionStorage.getItem("name")}
              onChange={(e) => setField("name", e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>What is your Country</Form.Label>
            <Form.Select
              // value={sessionStorage.getItem("country")}
              defaultValue={sessionStorage.getItem("country")}
              isInvalid={!!errors.country}
              onChange={(e) => setField("country", e.target.value)}
            >
              <option selected value="null" className="selectNull">
                Select country
              </option>
              {countrylist.map((list, index) => (
                <option value={list.name}>{list.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>

          <Button onClick={handleSave} variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Home;
