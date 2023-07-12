import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { MyPlantDispatchContext } from "../../context/MyPlantStore";
//import { MyPlantDispatchContext } from "./MyPlantList";
//import "../../styles/myplant.css";

const MyPlantRegisterModal = ({ showModal, onClose }) => {
  const { onCreate } = useContext(MyPlantDispatchContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    startDate: new Date().toISOString().split("T")[0],
    waterDate: new Date().toISOString().split("T")[0],
    waterCycle: "",
    nickname: "",
    name: "",
    //thumbnail: "",
    memo: "",
  });
  const [waterAlarm, setWaterAlram] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const waterCycleOptions = Array.from(Array(180), (_, i) => i + 1);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleToggleWaterCycle = () => {
    setWaterAlram(!waterAlarm);
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleInputReset = () => {
    setInputs({
      startDate: new Date().toISOString().split("T")[0],
      waterDate: new Date().toISOString().split("T")[0],
      waterCycle: "",
      nickname: "",
      name: "",
      memo: "",
    });
  };

  const handleModalSubmit = () => {
    // 등록하기 버튼 클릭 시 동작
    if (window.confirm("내 식물을 등록하시겠습니까?")) {
      onCreate({ ...inputs });
    }
    handleInputReset();
    onClose();
    navigate("/my-plants", { replace: true });
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>내 식물 등록하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 썸네일 이미지 등록 */}
          <Form.Group className="d-flex flex-column align-items-center">
            <div className="thumbnail-container">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Plant Thumbnail"
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-placeholder">
                  <label htmlFor="file-input" className="upload-icon">
                    <FaPlus />
                  </label>
                  <div className="upload-text">내 식물 사진 등록하기</div>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }} // input 요소 숨김
                  />
                </div>
              )}
            </div>
          </Form.Group>

          {/* 식물명 검색 */}
          <Form.Group className="mb-3">
            <Form.Label>식물명 검색</Form.Label>
            <Form.Control
              type="text"
              placeholder="식물명을 검색하세요"
              onChange={handleInputChange}
              name="plantName"
              value={inputs.plantName}
            />
          </Form.Group>

          {/* 애칭 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>애칭</Form.Label>
            <Form.Control
              type="text"
              placeholder="애칭을 입력하세요"
              onChange={handleInputChange}
              name="nickname"
              value={inputs.nickname}
            />
          </Form.Group>

          {/* 키우기 시작한 날짜 선택 */}
          <Form.Group className="mb-3">
            <Form.Label>키우기 시작한 날짜</Form.Label>
            <Form.Control
              type="date"
              onChange={handleInputChange}
              name="startDate"
              value={inputs.startDate}
            />
          </Form.Group>

          {/* 물주기 알림 토글 버튼 */}
          <Form.Group controlId="waterCycleToggle" className="mb-3">
            <Form.Check
              type="switch"
              label="물주기 알림"
              checked={waterAlarm}
              onChange={handleToggleWaterCycle}
              name="waterAlram"
            />
          </Form.Group>

          {/* 물주기 주기 선택 */}
          {waterAlarm && (
            <Form.Group className="mb-3">
              <Form.Label>물 주기</Form.Label>
              <div className="water-cycle-select">
                <Form.Select
                  value={inputs.waterCycle}
                  onChange={handleInputChange}
                  name="waterCycle"
                  style={{ width: "200px", display: "inline" }}
                >
                  <option value="">주기를 선택해주세요</option>
                  {waterCycleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                <span
                  className="cycle-repeat"
                  style={{ fontSize: "13px", marginLeft: "3px" }}
                >
                  일 주기로 반복
                </span>
              </div>
            </Form.Group>
          )}

          {/* 물 준 날짜 선택 */}
          <Form.Group className="mb-3">
            <Form.Label>물 준 날짜</Form.Label>
            <Form.Control
              type="date"
              onChange={handleInputChange}
              name="waterDate"
              value={inputs.waterDate}
            />
          </Form.Group>

          {/* 메모 */}
          <Form.Group className="mb-3">
            <Form.Label>메모</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleInputChange}
              name="memo"
              rows={3}
              value={inputs.memo}
              placeholder=""
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button variant="success" onClick={handleModalSubmit}>
          등록하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyPlantRegisterModal;
