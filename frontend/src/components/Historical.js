import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { getHistoricalQuotes } from "../api/api";

export const Historical = () => {
  const [rate, setRate] = useState(null);
  const [data, setData] = useState({
    asset: null,
    timestamp: null,
  });

  const setAsset = (asset) =>
    setData({
      ...data,
      asset,
    });

  const setTimestamp = (value) => {
    const date = new Date(value);
    const timestamp = Math.floor(date.getTime() / 1000); //timestamp in seconds

    setData({
      ...data,
      timestamp,
    });
  };

  const submit = async () => {
    if (data.asset && data.timestamp) {
      const rate = await getHistoricalQuotes(data.asset, data.timestamp);
      setRate(rate);
    }
  };

  return (
    <Row className="py-5 justify-content-center">
      <Col sm={8}>
        <Card>
          <Card.Body>
            <Card.Title className="mb-4">Historical quote</Card.Title>
            <Form.Group className="mb-3">
              <Form.Check
                onClick={() => setAsset("BTC")}
                className="mb-3"
                type="radio"
                label="BTC"
                name="asset"
              />
              <Form.Check
                onClick={() => setAsset("ETH")}
                type="radio"
                label="ETH"
                name="asset"
              />
              <Form.Control
                className="mt-3"
                type="date"
                name="duedate"
                placeholder="Due date"
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </Form.Group>
            <Button onClick={submit} variant="success" className="w-100 mt-3">
              Look up
            </Button>

            {rate ? (
              <>
                <p>{rate.time}</p>
                <h3 className="text-center my-3">
                  {data.asset}: {rate.rate}
                </h3>
              </>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
