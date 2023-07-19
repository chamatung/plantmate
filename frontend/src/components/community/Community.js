import React, { useEffect } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/ApiService";
import plant from "./plant.jpg";
import { FaPlus, FaAngleUp, FaBookmark } from "react-icons/fa";

import CommunityListView from "./CommunityListView";
import CommunityCardView from "./CommunityCardView";

const Community = () => {
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const [communityListCnt, setcommunityListCnt] = useState([]);

  // 초기 커뮤니티 데이터 가져오기
  useEffect(() => {
    apiService.get("community").then((res) => {
      console.log(res.data.list);
      setCommunityList(res.data.list);
      setcommunityListCnt(res.data.total);
    });
  }, []);

  const onMoveCommunityResiger = () => {
    navigate("/community/post-register");
  };

  const [activeButton, setActiveButton] = useState("button2");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleBookmarkClick = (e) => {
    navigate("/community/bookmark");
  };

  const handlePostDetailClick = (id, e) => {
    navigate("/community/post-detail/" + id);
  };

  return (
    <div>
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
          handlePostDetailClick={handlePostDetailClick}
        />
      )}
      {activeButton === "button3" && (
        <CommunityCardView communityPostList={communityList} />
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
        <Button
          variant="secondary"
          className="rounded-circle"
          onClick={handleBookmarkClick}
        >
          <FaBookmark />
        </Button>
      </div>
    </div>
  );
};
const CommunityImageView = () => {
  return (
    <div class="container mw-95">
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

export default Community;
