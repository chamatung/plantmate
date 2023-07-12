import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import { useNavigate } from "react-router";

/*
    커뮤니티 게시글 등록 화면
    - 등록항목
      : 제목(필수), 카테고리(필수), 본문(필수), 사진, 내식물
*/
const CommunityPostRegister = () => {
  const navigate = useNavigate();
  // 뒤로 가기

  const handleGoBack = () => {
    navigate(-1);
  };

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("1");
  const [myPlant, setMyPlant] = useState("");
  const [content, setContent] = useState("");

  // 본문 변경 함수
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  // 제목 변경 함수
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // 카테고리 변경 함수
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  // 내 식물
  const handleMyPlant = (event) => {
    setMyPlant(event.target.value);
  };

  // 게시글 등록 함수
  const handlePostRegister = () => {
    console.log("title", title);
    console.log("category", category);
    console.log("content", content);
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Col xs={2}>
            <Form.Select
              style={{ width: "100%" }}
              onChange={handleChangeCategory}
            >
              <option value="1">자랑해요</option>
              <option value="2">식물정보</option>
              <option value="3">질문해요</option>
            </Form.Select>
          </Col>
          <Col xs={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={handleChangeTitle}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridContent">
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChangeContent}
              style={{ height: "300px" }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formMyPlant" as={Col}>
            <Form.Select
              style={{ width: "100%" }}
              onChange={handleMyPlant}
              value={myPlant}
            >
              <option value="">내식물</option>
              <option value="1">몬스터(몬스테라)</option>
              <option value="2">대나(대나무야자)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" as={Col}>
            <Form.Control type="file" multiple />
          </Form.Group>
        </Row>
      </Form>
      <Row className="mb-3">
        <Col>
          <Button variant="success" onClick={handleGoBack}>
            취소
          </Button>
          <Button variant="success" onClick={handlePostRegister}>
            등록
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityPostRegister;
