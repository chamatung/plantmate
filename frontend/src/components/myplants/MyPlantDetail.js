import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  MyPlantDispatchContext,
  MyPlantStateContext,
} from "../../context/MyPlantStore";

const MyPlantDetail = () => {
  const plantList = useContext(MyPlantStateContext);
  const { onRemove } = useContext(MyPlantDispatchContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (plantList.length >= 1) {
      const targetPlant = plantList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetPlant) {
        setData(targetPlant);
      } else {
        alert("없는 식물입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, plantList]);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(data.id);
      navigate("/my-plants", { replace: true });
    }
  };

  if (!data) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <Container>
        <Row className="mt-5">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={data.thumbnail} />
              <Card.Body>
                <Card.Title>{data.nickname}</Card.Title>
                <Card.Subtitle>{data.name}</Card.Subtitle>
                <Card.Text>
                  <strong>{data.startDate}</strong> 부터 키우기 시작
                </Card.Text>
                {/* <Card.Text>
                <strong>물 주기:</strong> {data.waterCycle}일마다
              </Card.Text> */}
              </Card.Body>
              <Card.Footer>
                <Button variant="success" style={{ marginRight: "5px" }}>
                  수정
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                  삭제
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>식물 상세 정보</Card.Title>
                {/* <Card.Text>{plant.description}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default MyPlantDetail;
