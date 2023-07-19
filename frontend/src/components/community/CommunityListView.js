import { Container, ListGroup, Badge } from "react-bootstrap";
import moment from "moment";
import React from "react";
import { useLocation } from "react-router";

const CommunityListView = (props) => {
  console.log(props);
  console.log("useLocation", useLocation());
  const location = useLocation();
  const isBookmark = location.pathname.indexOf("bookmark") < 0 ? false : true;
  return (
    <div class="container mw-95">
      {isBookmark ? <h1>북마크</h1> : <h1></h1>}
      <Container>
        <span>게시글 수 : {props.communityListCnt}</span>
        <ListGroup>
          {props.communityPostList.map((post, index) => (
            <ListGroup.Item
              id={post.id}
              key={post.id}
              onClick={(e) => {
                props.handlePostDetailClick(post.id, e);
              }}
            >
              <div className="ms-2 me-auto">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {
                      {
                        B: "자랑해요",
                        A: "질문해요",
                        C: "봐주세요",
                        L: "생활정보",
                        S: "정보공유",
                      }[post.categoryId]
                    }
                  </span>
                  <Badge bg="success" pill>
                    14
                  </Badge>
                </div>
                <div>
                  <div
                    /*className="fw-bold"*/
                    style={{
                      display: "flex",
                      fontSize: "12pt",
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
                    {post.nickname}{" "}
                    {moment(post.createDate).format("YYYY-MM-DD HH:mm:ss")}
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
export default CommunityListView;
