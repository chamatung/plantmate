import React, { useEffect } from "react";
import {
  Button,
  ListGroup,
  Badge,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
  Image,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import apiService from "../../services/ApiService";
import Api from "../../utils/Api";
import plant from "./plant.jpg";
import { FaPlus, FaAngleUp } from "react-icons/fa";

const Community = () => {
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const [communityListCnt, setcommunityListCnt] = useState([]);

  // 초기 커뮤니티 데이터 가져오기
  useEffect(() => {
    apiService.get("community").then((res) => {
      console.log("res : ", res.data);
      setCommunityList(res.data.list);
      setcommunityListCnt(res.data.total);
    });
  }, []);

  // 커뮤니티 게시글 등록 화면 이동 이벤트
  const onMoveCommunityResiger = () => {
    navigate("/community/post-register");
  };

  const LIST_DUMMY = [
    {
      id: "1",
      title: "식물 정보 공유합니다.",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:50:33",
      category: "정보공유",
    },
    {
      id: "2",
      title: "제 몬스테라 예쁘죠?",
      content: "몬스테라인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:55:33",
      category: "자랑해요",
    },
    {
      id: "3",
      title: "제 식물 왜이러죠..?",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:50:33",
      category: "봐주세요",
    },
    {
      id: "4",
      title: "식물 영양제 추천",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:50:33",
      category: "정보공유",
    },
    {
      id: "5",
      title: "식물 정보 공유합니다.",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:50:33",
      category: "정보공유",
    },
    {
      id: "6",
      title: "제 몬스테라 예쁘죠?",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:55:33",
      category: "자랑해요",
    },
  ];

  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <Button variant="success" onClick={() => handleButtonClick("button1")}>
        이미지형
      </Button>
      <Button variant="success" onClick={() => handleButtonClick("button2")}>
        리스트형
      </Button>
      <Button variant="success" onClick={() => handleButtonClick("button3")}>
        상세형
      </Button>

      {activeButton === "button1" && <CommunityImageView />}
      {activeButton === "button2" && (
        <CommunityListView
          communityPostList={communityList}
          communityListCnt={communityListCnt}
        />
      )}
      {activeButton === "button3" && (
        <CommunityCardView communityPostList={LIST_DUMMY} />
      )}

      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "115px",
          zIndex: 9999,
        }}
      >
        <Button
          variant="success"
          className="rounded-circle"
          onClick={onMoveCommunityResiger}
        >
          <FaPlus />
        </Button>
      </div>

      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "70px",
          zIndex: 9999,
        }}
      >
        <Button variant="secondary" className="rounded-circle">
          <FaAngleUp />
        </Button>
      </div>
    </div>
  );
};
const CommunityImageView = () => {
  return (
    <div>
      <h2></h2>
      <Container>
        <Row>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
          <Col sm={12} md={4} className="p-0">
            <Image src={plant} thumbnail />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CommunityListView = (props) => {
  return (
    <div>
      <h1></h1>
      <Container>
        <span>게시글 수 : {props.communityListCnt}</span>
        <ListGroup>
          {props.communityPostList.map((post, index) => (
            <ListGroup.Item id={index}>
              <div className="ms-2 me-auto">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Badge bg="primary" pill>
                    {post.category}
                  </Badge>
                  <Badge bg="success" pill>
                    14
                  </Badge>
                </div>
                <div>
                  <div
                    className="fw-bold"
                    style={{
                      display: "flex",
                      fontSize: "10pt",
                      marginTop: "5px",
                    }}
                  >
                    {post.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "8pt",
                      marginTop: "3px",
                    }}
                  >
                    {post.nickname} {post.create_dt}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

const CommunityCardView = (props) => {
  const communityPostList = props.communityPostList;
  const navigate = useNavigate();

  const onClickPostDetail = (id, e) => {
    console.log(id);
    navigate("/community/post-detail/" + id);
  };

  return (
    <div>
      <h1></h1>
      <Container>
        <Row xs={1} md={1} lg={1}>
          {communityPostList.map((post, id) => (
            <Col
              key={post.id}
              onClick={(e) => {
                onClickPostDetail(post.id, e);
              }}
            >
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "left", marginTop: "5px" }}>
                    {post.title}
                  </Card.Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{post.create_dt}</p>
                    <p>조회수: 8</p>
                  </div>
                  <Card.Img
                    variant="middle"
                    src={plant}
                    style={{ width: "30%", height: "30%", objectFit: "cover" }}
                  />
                  <Card.Text style={{ textAlign: "left" }}>
                    {post.content}
                  </Card.Text>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <span>댓글 :13</span>
                    </div>
                    <ToggleButton id="tbg-btn-1" value={1}>
                      북마크
                    </ToggleButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Community;
