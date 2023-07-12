import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useContext,
} from "react";

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import MyPlantRegisterModal from "./MyPlantRegisterModal";
import { useNavigate } from "react-router";
import { MyPlantStateContext } from "../../context/MyPlantStore";
//import Page from "../layout/Page";

// const reducer = (state, action) => {
//   let newState = [];
//   switch (action.type) {
//     case "INIT": {
//       return action.data;
//     }
//     case "CREATE": {
//       newState = [action.data, ...state];
//       break;
//     }
//     default:
//       return state;
//   }

//   localStorage.setItem("myplant", JSON.stringify(newState));
//   return newState;
// };

//export const MyPlantStateContext = React.createContext();
//export const MyPlantDispatchContext = React.createContext();

const MyPlantList = () => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const [data, dispatch] = useReducer(reducer, []);
  const [data, setData] = useState([]);
  const plantList = useContext(MyPlantStateContext);

  //초기 사이즈 확인 및 resize event mount시 추가 및 unmount시 삭제
  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (plantList.length >= 1) {
      setData(plantList);
    }
  }, [plantList]);

  // useEffect(() => {
  //   //localStorage.removeItem("myplant");
  //   const localData = localStorage.getItem("myplant");
  //   if (localData) {
  //     const myPlantList = JSON.parse(localData).sort(
  //       (a, b) => parseInt(b.id) - parseInt(a.id)
  //     );
  //     dataId.current = parseInt(myPlantList[0].id) + 1;

  //     dispatch({ type: "INIT", data: myPlantList });
  //   }
  // }, []);

  // const dataId = useRef(0);

  // const onCreate = ({ name, nickname, waterCycle, startDate }) => {
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: dataId.current,
  //       thumbnail: "https://source.unsplash.com/random/300x300/?plant",
  //       name: name,
  //       nickname: nickname,
  //       waterCycle: waterCycle,
  //       startDate: startDate,
  //     },
  //   });
  //   dataId.current += 1;
  // };

  const plants = [
    {
      id: 1,
      thumbnail: "https://source.unsplash.com/random/300x300/?plant",
      nickname: "애칭1",
      name: "Plant 1",
      startDate: "2023-06-01",
      waterCycle: 3, // 예시: 3일마다 물을 줌
      waterAlarm: "Y",
      waterMark: "Y",
    },
    {
      id: 2,
      thumbnail: "https://source.unsplash.com/random/300x300/?plants",
      nickname: "애칭2",
      name: "Plant 2",
      startDate: "2023-06-06",
      waterCycle: 2,
      waterAlarm: "N",
      waterMark: "N",
    },
    {
      id: 3,
      thumbnail: "https://source.unsplash.com/random/300x300/?flower",
      nickname: "애칭3",
      name: "Plant 3",
      startDate: "2023-06-07",
      waterCycle: 30,
      waterAlarm: "N",
      waterMark: "N",
    },
    {
      id: 4,
      thumbnail: "https://source.unsplash.com/random/300x300/?flowers",
      nickname: "애칭4",
      name: "Plant 4",
      startDate: "2023-06-08",
      waterCycle: 20,
      waterAlarm: "Y",
      waterMark: "Y",
    },
  ];

  const handleRegisterPlant = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCardHover = (e) => {
    e.currentTarget.classList.add("card-hover");
  };

  const handleCardLeave = (e) => {
    e.currentTarget.classList.remove("card-hover");
  };

  const handleCardClick = (id) => {
    navigate(`/my-plants/${id}`);
  };

  return (
    <Container>
      <Container>
        <Row
          style={
            isExpanded
              ? {
                  border: "0.1px solid rgba(204, 204, 204, .5)",
                  marginBottom: "10px",
                  padding: "10px",
                  paddingLeft: "50px",
                  paddingRight: "30px",
                }
              : {
                  border: "0.1px solid rgba(204, 204, 204, .5)",
                  marginBottom: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                }
          }
        >
          <Row
            style={{
              display: "flex",
            }}
          >
            <Col
              xs={{ order: "1", span: "6" }}
              md={{ order: "1", span: "2" }}
              style={{
                marginTop: "5px",
              }}
            >
              <Form.Select>
                <option>날짜정렬</option>
                <option>최신순</option>
                <option>오래된순</option>
              </Form.Select>
            </Col>
            <Col
              xs={{ order: "2", span: "6" }}
              md={{ order: "2", span: "2" }}
              style={{ marginTop: "5px" }}
            >
              <Form.Select>
                <option>전체</option>
                <option>제목</option>
                <option>식물 한글명</option>
                <option>식물 닉네임</option>
              </Form.Select>
            </Col>
            <Col
              xs={{ order: "3", span: "8" }}
              md={{ order: "3", span: "5" }}
              style={{
                marginTop: "5px",
              }}
            >
              <form>
                <Form.Control type="text" placeholder="내 식물 검색" />
              </form>
            </Col>
            <Col
              xs={{ order: "4", span: "4" }}
              sm={{ order: "4", span: "2" }}
              md={{ order: "4", span: "2" }}
              lg={{ order: "4", span: "1" }}
              style={{
                marginTop: "5px",
              }}
            >
              <Button
                variant="secondary"
                style={{
                  width: "100%",
                }}
              >
                조회
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
      <Container
        style={{
          marginBottom: "100px",
        }}
      >
        <Row
          style={{
            border: "0.1px solid rgba(204, 204, 204, .5)",
            padding: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginBottom: "20px",
          }}
        >
          <Row>
            {data.length > 0 ? (
              data.map((plant) => (
                <Col md={3} key={plant.id}>
                  <Card
                    className="mb-4"
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(plant.id)}
                  >
                    <Card.Img variant="top" src={plant.thumbnail} />
                    {plant.waterAlarm === "Y" && plant.waterMark === "Y" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          zIndex: 1,
                        }}
                      >
                        <GiWaterDrop size="3em" color="skyblue" />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title>{plant.nickname}</Card.Title>
                      <Card.Subtitle>{plant.name}</Card.Subtitle>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>{plant.startDate}</strong> 부터 키우기 시작
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>{plant.waterCycle}</strong> 일 마다 물 주기
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    {/* <Card.Footer>
                      <Button variant="primary" size="sm" block>
                        {plant.waterMark && <GiWaterDrop />}
                      </Button>
                    </Card.Footer> */}
                  </Card>
                </Col>
              ))
            ) : (
              <Alert
                key={"success"}
                variant={"success"}
                style={{ height: "250px", padding: "80px" }}
              >
                <Alert.Heading>등록된 내 식물이 없습니다.</Alert.Heading>
                <p>하단의 등록버튼을 클릭하여 식물을 등록해보세요.</p>
              </Alert>
            )}
          </Row>
        </Row>
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "70px",
            zIndex: 9999,
          }}
        >
          <Button
            variant="success"
            className="rounded-circle"
            onClick={() => handleRegisterPlant()}
          >
            <FaPlus />
          </Button>
        </div>
        {/* <Page isExpanded={isExpanded} /> */}
      </Container>
      {/* <MyPlantStateContext.Provider value={data}>
        <MyPlantDispatchContext.Provider value={{ onCreate }}> */}
      <MyPlantRegisterModal
        showModal={showModal}
        onClose={handleModalClose}
      ></MyPlantRegisterModal>
      {/* </MyPlantDispatchContext.Provider>
      </MyPlantStateContext.Provider> */}
    </Container>
  );
};

export default MyPlantList;
