import { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
function Color() {
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  console.log(form.color);

  const handleSave = async (e) => {
    setIsPending(true);
    e.preventDefault();

    if (sessionStorage.getItem("color")) {
      // sessionStorage.clear("color");
      sessionStorage.setItem("color", form.color);
    } else {
      sessionStorage.setItem("color", form.color);
    }
    setIsPending(false);
    navigate("/finalform");
  };

  function handlePrevious() {
    navigate("/formemail");
  }
  return (
    <div>
      <Container>
        {errors && <Alert variant="danger">{errors}</Alert>}

        <Form>
          <Form.Check
            value="Red"
            inline
            type="radio"
            label="Red"
            name="group1"
            onChange={(e) => setField("color", e.target.value)}
          />
          <Form.Check
            value="Green"
            inline
            type="radio"
            label="Green"
            name="group1"
            onChange={(e) => setField("color", e.target.value)}
          />
          <Form.Check
            value="Blue"
            inline
            type="radio"
            label="Blue"
            name="group1"
            onChange={(e) => setField("color", e.target.value)}
          />
          <Form.Check
            value="Other"
            inline
            type="radio"
            label="Other"
            name="group1"
            onChange={(e) => setField("color", e.target.value)}
          />
          <br />
          <Button
            className="btnPrev"
            onClick={handlePrevious}
            variant="danger"
            type="submit"
          >
            Previous
          </Button>
          <Button
            onClick={handleSave}
            style={{ margin: "5px" }}
            variant="success"
            type="submit"
          >
            Submit
            {isPending && (
              <>
                {" "}
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Color;
