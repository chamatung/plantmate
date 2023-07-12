import React, {useContext, useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { RootContext } from "../../../context/RootStore";
import ApiService from "../../../services/ApiService";


const DiaryFormModal = ({ showFormModal, setShowFormModal }) => {

    const { diaryFormInfo } = useContext(RootContext);
    const {diaryFormStore, diaryFormDispatch, diaryFormState} = diaryFormInfo;

    const handlePhotoChange = (event) => {
        const files = Array.from(event.target.files);
        diaryFormDispatch({ type: "ADD_DIARY_PHOTO_FORM", payload: {photos: files} });
    };
    const handleDataChange = (event) => {
        diaryFormDispatch({ type: "ADD_DIARY_FORM", payload: event.target });
    }

    const handleDeletePhoto = (index) => {
        const updatedFiles = [...diaryFormState.photos];
        updatedFiles.splice(index, 1);
        diaryFormDispatch({ type: "UPDATE_DIARY_PHOTO_FORM", payload: {photos: updatedFiles}});
    };

    const handleClear = () => {
        diaryFormDispatch({ type: "CLEAR_DIARY_FORM", payload: diaryFormStore.initialDiaryForm });
        setShowFormModal(false)
    };

    useEffect(() => {
        diaryFormStore.getContent(diaryFormDispatch);
        return () => diaryFormDispatch({ type: "CLEAR_DIARY_FORM", payload: diaryFormStore.initialDiaryForm });
    }, [])

    return (
        <Modal
            show={showFormModal}
            onHide={() => handleClear()}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>성장일지 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="title">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" placeholder="제목" value={diaryFormState.title} onChange={handleDataChange}/>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="date">
                            <Form.Label>작성일</Form.Label>
                            <Form.Control type="date"  value={diaryFormState.date} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="nickName">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control type="text" placeholder="닉네임" value={diaryFormState.nickName} onChange={handleDataChange} />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="plantLength">
                            <Form.Label>식물 길이</Form.Label>
                            <Form.Control type="text" placeholder="식물 길이" value={diaryFormState.plantLength} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="leafCount">
                            <Form.Label>잎의 수</Form.Label>
                            <Form.Control type="text" placeholder="잎의 수" value={diaryFormState.leafCount} onChange={handleDataChange}/>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="growthStatus">
                            <Form.Label>성장 상태</Form.Label>
                            <Form.Control as="select" value={diaryFormState.growthStatus} onChange={handleDataChange}>
                                <option value="">선택하세요</option>
                                <option value="씨앗">씨앗</option>
                                <option value="발아">발아</option>
                                <option value="성장">성장</option>
                                <option value="개화">개화</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="waterSupply">
                            <Form.Label>물 공급 여부</Form.Label>
                            <Form.Control as="select" value={diaryFormState.waterSupply} onChange={handleDataChange}>
                                <option value="">선택하세요</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="soilType">
                            <Form.Label>토양 종류</Form.Label>
                            <Form.Control type="text" placeholder="토양 종류" value={diaryFormState.soilType} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="fertilizerType">
                            <Form.Label>비료 종류</Form.Label>
                            <Form.Control type="text" placeholder="비료 종류" value={diaryFormState.fertilizerType} onChange={handleDataChange}/>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="temperature">
                            <Form.Label>온도</Form.Label>
                            <Form.Control type="text" placeholder="온도" value={diaryFormState.temperature} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="humidity">
                            <Form.Label>습도</Form.Label>
                            <Form.Control type="text" placeholder="습도" value={diaryFormState.humidity} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="growthContent">
                            <Form.Label>성장 내용</Form.Label>
                            <Form.Control as="textarea" placeholder="성장 내용" rows={3} value={diaryFormState.growthContent} onChange={handleDataChange}/>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="remarks">
                            <Form.Label>특이 사항</Form.Label>
                            <Form.Control as="textarea" placeholder="특이 사항" rows={3} value={diaryFormState.remarks} onChange={handleDataChange}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="photos">
                            <Form.Label>사진 등록</Form.Label>
                            <Form.Control type="file" onChange={handlePhotoChange} />
                        </Form.Group>
                    </Row>
                    {diaryFormState?.photos.length > 0 && (
                        <Row className="mb-3">
                            {diaryFormState?.photos.map((photo, index) => (
                                <Col key={index} xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>{photo.name}</Form.Label>
                                        <Button variant="danger" onClick={() => handleDeletePhoto(index)}>
                                            삭제
                                        </Button>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    )}
                    <Row className="justify-content-center">
                        <Col xs={6} md={4} className="d-flex justify-content-center">
                            <Button variant="secondary" onClick={() => handleClear()} block={"true"}>
                                닫기
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DiaryFormModal;
