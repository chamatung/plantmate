import { useNavigate } from "react-router";
import { Container, Row, Card, Col, ToggleButton } from "react-bootstrap";

const CommunityCardView = (props) => {
  const communityPostList = props.communityPostList;
  const navigate = useNavigate();

  const onClickPostDetail = (id, e) => {
    console.log(id);
    navigate("/community/post-detail/" + id);
  };

  return (
    <div class="container mw-95">
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
                    //src={plant}
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

export default CommunityCardView;
