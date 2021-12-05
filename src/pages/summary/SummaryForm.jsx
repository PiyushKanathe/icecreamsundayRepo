import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = () => {
  const [tcStatus, settcStatus] = useState(false);
  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-condtions">
        <Form.Check
          type="checkbox"
          checked={tcStatus}
          onChange={(e) => settcStatus(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcStatus}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
