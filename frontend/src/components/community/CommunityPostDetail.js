import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import plant from "./plant.jpg";
import { useParams } from "react-router";
import apiService from "../../services/ApiService";

const CommunityPostDetail = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [commentText, setCommentText] = useState("");
  // 파라미터 가져오기
  const { id } = useParams();
  console.log(useParams());

  useEffect(() => {
    // api 값 받기
    const post = {
      id: "1",
      title: "식물 정보 공유합니다.",
      content: "홍콩야자수인데요..",
      nickname: "식물천사",
      create_dt: "2023-06-13 15:50:33",
      category: "정보공유",
    };

    const TMP_COMMENT = [
      {
        id: "1",
        nickname: "식물천재",
        text: "기엽네요",
        create_dt: "2023-06-13 15:50:33",
      },
    ];

    setComments(TMP_COMMENT);
    setPost(post);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        { id: Date.now(), text: commentText },
      ]);
      setCommentText("");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow">
            <div className="mt-3">
              <h4>{post.title}</h4>
              <p>{post.create_dt}</p>
              <Image
                src={plant}
                fluid
                style={{ width: "50%", height: "50%", objectFit: "cover" }}
              />
              <p>{post.content}</p>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 shadow">
            <div className="mt-3">
              <h5>댓글</h5>
              <ul className="list-unstyled">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    style={{ textAlign: "left", fontSize: "10pt" }}
                  >
                    {comment.nickname}:{comment.text}( {comment.create_dt})
                  </li>
                ))}
              </ul>
            </div>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Control
                type="text"
                placeholder="댓글을 입력하세요."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button variant="primary mt-2" type="submit">
                댓글 작성
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityPostDetail;
