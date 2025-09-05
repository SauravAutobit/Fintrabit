import "./DetailsForm.css";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";

const DetailsForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    userId: yup.string().required("user id is a required field"),
    firstName: yup.string().required("firstname is a required field"),
    lastName: yup.string().required("lastname is a required field"),
    emailId: yup.string().required("email id is a required field"),
    contactNumber: yup.string().required("contact number is a required field"),
    country: yup.string().required("country is a required field"),
    city: yup.string().required("city is a required field"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        userId: "",
        firstName: "",
        lastName: "",
        emailId: "",
        contactNumber: "",
        country: "",
        city: "",
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="detailsForm-container"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="formUserId">
              <Form.Label>
                User ID<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User ID"
                name="userId"
                value={values.userId}
                onChange={handleChange}
                isInvalid={!!errors.userId}
                className="detailsForm-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.userId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formFirstName">
              <Form.Label>
                First name<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                className="detailsForm-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="formLastName">
              <Form.Label>
                Last name<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                className="detailsForm-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formEmailId">
              <Form.Label>
                Email ID<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter Email ID"
                  aria-describedby="inputGroupPrepend"
                  name="emailId"
                  value={values.emailId}
                  onChange={handleChange}
                  isInvalid={!!errors.emailId}
                  className="detailsForm-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.emailId}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formContactNumber">
              <Form.Label>
                Contact Number<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Number"
                name="contactNumber"
                value={values.contactNumber}
                onChange={handleChange}
                isInvalid={!!errors.contactNumber}
                className="detailsForm-input"
              />

              <Form.Control.Feedback type="invalid">
                {errors.contactNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formCountry">
              <Form.Label>
                Country<span style={{ color: "#D00416" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                name="country"
                value={values.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
                className="detailsForm-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                className="detailsForm-input"
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button> */}
        </Form>
      )}
    </Formik>
  );
};

export default DetailsForm;
