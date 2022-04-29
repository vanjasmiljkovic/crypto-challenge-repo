import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { getLatestQuotes } from "../api/api";

export const Latest = () => {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState({
    BTC: false,
    ETH: false,
  });

  const onChange = (asset, { target }) => {
    const { checked } = target;

    setSelected({
      ...selected,
      [asset]: checked,
    });
  };

  const submit = async () => {
    const selectedAssets = Object.entries(selected)
      .filter(([, value]) => !!value)
      .map(([key]) => key);

    if (selectedAssets.length) {
      const data = await getLatestQuotes(selectedAssets);
      setRates(data);
    }
  };

  return (
    <Row className="py-5 justify-content-center">
      <Col sm={8}>
        <Card>
          <Card.Body>
            <Card.Title className="mb-4">Latest quote</Card.Title>
            <Form.Group className="mb-3">
              <Form.Check
                onChange={(e) => onChange("BTC", e)}
                className="mb-3"
                type="checkbox"
                label="BTC"
                name="asset"
              />
              <Form.Check
                onChange={(e) => onChange("ETH", e)}
                type="checkbox"
                label="ETH"
                name="asset"
              />
            </Form.Group>
            <Button onClick={submit} variant="success" className="w-100 mt-3">
              Look up
            </Button>

            {Object.keys(selected).map((key) => {
              const rate = rates.find((r) => r.name === key);
              console.log("Rate, key", rate, key);
              return (
                <h3 key={key} className="text-center my-3">
                  {key}: {rate ? rate.price : "N/A"}
                </h3>
              );
            })}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
