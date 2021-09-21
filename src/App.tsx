import "./App.css";
import { Button, Card, Form } from "react-bootstrap";

const App = () => (
  <>
    <Card>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label> Upload an image </Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button variant="primary">Upload</Button>
        </Form>
      </Card.Body>
    </Card>
  </>
);

export default App;
