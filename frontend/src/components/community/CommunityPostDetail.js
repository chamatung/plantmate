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
import moment from "moment";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
const CommunityPostDetail = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setbookmarkId] = useState("");
  const { id } = useParams(); // url 파라미터 가져오기

  useEffect(() => {
    getCommunityDetail();
    getCommentList();
    checkBookmark();
  }, []);

  // 게시물 데이터 가져오기
  const getCommunityDetail = () => {
    apiService.get("community/" + id).then((res) => {
      setPost(res.data);
    });
  };
  // 댓글리스트 가져오기
  const getCommentList = () => {
    const param = {
      communityId: id,
    };
    console.log(param);
    apiService.get("comment", param).then((res) => {
      console.log(res.data.list);
      setComments(res.data.list); // 더미데이터
    });
  };
  // 북마트 여부 체크
  const checkBookmark = () => {
    const param = {
      communityId: id,
      userId: "tester",
    };
    apiService.get("bookmark", param).then((res) => {
      if (res.data.total > 0) {
        setIsBookmarked(true);
        setbookmarkId(res.data.list[0].id);
      } else {
        setIsBookmarked(false);
        setbookmarkId("");
      }
    });
  };

  // 댓글 등록
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const param = {
      communityId: id,
      comment: commentText,
      userId: "tester",
    };

    apiService.post("comment", param).then((res) => {
      getCommentList(); //-> 이렇게 하는게 맞나?
      setCommentText("");
    });
  };

  // 북마크 등록 / 해제
  const handleBookmarkClick = (e) => {
    // 등록
    if (bookmarkId === "") {
      const param = {
        userId: "tester",
        communityId: id,
      };

      apiService.post("bookmark", param).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          // 시작할 때 있는지 없는지 체크 후 아이콘으로 보여주기
          alert("북마크 되었습니다.");
          setIsBookmarked(res.data.id);
          // TODO 아이디 가져와야하는데..
        }
      });
      // 해제
    } else {
      apiService.delete("bookmark/" + bookmarkId).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          // 시작할 때 있는지 없는지 체크 후 아이콘으로 보여주기
          alert("북마크가 해제되었습니다.");
          setIsBookmarked(false);
          setbookmarkId("");
        }
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow">
            <div className="mt-3 post-area">
              <div className="user-area">
                <Image src={plant} roundedCircle />
                <span>식물천사</span>
                <span>
                  {" "}
                  {moment(post.createDate).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
              <div className="content-area mt-3">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>

              <div className="image-area"></div>
              <div className="bookmark-area">
                <Button onClick={() => handleBookmarkClick()} variant="success">
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </Button>
              </div>
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
                    {comment.userId}: {comment.comment}({" "}
                    {moment(post.createDate).format("YYYY-MM-DD HH:mm:ss")})
                  </li>
                ))}
              </ul>
            </div>
            <Form>
              <Form.Control
                type="text"
                placeholder="댓글을 입력하세요."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                variant="primary mt-2"
                type="submit"
                onClick={handleCommentSubmit}
              >
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
