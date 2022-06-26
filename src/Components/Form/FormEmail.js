import { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormEmail() {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  var emails;

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  function handlePrevious() {
    navigate("/");
  }

  const findFormErrors = () => {
    const { email } = form;
    const newErrors = {};
    var regex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (email) {
      if (regex.test(email) === false) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!email || email.trim() === "") {
      if (!emails) {
        newErrors.email = "Email is Required";
      }
    }

    return newErrors;
  };
  const handleSave = async (e) => {
    setIsPending(true);
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if (sessionStorage.getItem("email")) {
        sessionStorage.clear("email");
        sessionStorage.setItem("email", form.email);
      } else {
        sessionStorage.setItem("email", form.email);
      }
      setIsPending(false);
      navigate("/color");
    }
  };

  emails = sessionStorage.getItem("name");

  return (
    <div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>What is Your Email ?</Form.Label>
            <Form.Control
              type="text"
              defaultValue={sessionStorage.getItem("email")}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="btnPrev"
            onClick={handlePrevious}
            variant="outlined"
            type="submit"
          >
            Previous
          </Button>
          <Button
            style={{ margin: "5px" }}
            onClick={handleSave}
            variant="primary"
            type="submit"
          >
            Next
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default FormEmail;
