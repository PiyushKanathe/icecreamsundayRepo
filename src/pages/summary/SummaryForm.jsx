import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = () => {
  const [tcStatus, settcStatus] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will be delivered</Popover.Content>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
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
