import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import apiService from '../../../services/ApiService';
import { CSSTransition } from 'react-transition-group';

const DiaryDetailModal = ({ showDetailModal, setShowDetailModal, detailRecordId }) => {
    const [detail, setDetail] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const param = {
            detailRecordId: detailRecordId,
        };
        apiService
            .get('growth', param)
            .then((response) => {
                setDetail(response?.detail || {});
            })
            .catch();

        return handleClear;
    }, []);

    const handleClear = () => {
        setDetail({});
    };

    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === (detail.files?.length || 0) - 1;

    const renderImage = () => {
        const imageUrl = detail.files && detail.files[currentImageIndex];
        if (imageUrl) {
            return (
                <img
                    src={imageUrl}
                    alt="식물"
                    style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }}
                />
            );
        } else {
            return (
                <img
                    src={process.env.PUBLIC_URL + '/defaultimg/default.png'}
                    alt="기본 이미지"
                    style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }}
                />
            );
        }
    };

    return (
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
            <Modal.Body style={{ minWidth: '500px', minHeight: '500px', padding:'40px'}}>
                <Row className="justify-content-center mb-4">
                    <Col xs={4} className="d-flex justify-content-center">
                        <h4>Title: {detail.title ? detail.title : '허허'}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-4">
                    <Col xs={1} className="d-flex justify-content-end">
                        {!isFirstImage && (
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    setCurrentImageIndex(
                                        (currentImageIndex - 1 + (detail.files?.length || 0)) % (detail.files?.length || 1)
                                    )
                                }
                                style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}
                            >
                                &lt;
                            </Button>
                        )}
                    </Col>
                    <Col xs={5} className="text-center">
                        <CSSTransition in={true} appear={true} timeout={300} classNames="slide">
                            {renderImage()}
                        </CSSTransition>
                    </Col>
                    <Col xs={1} className="d-flex justify-content-start">
                        {!isLastImage && (
                            <Button
                                variant="secondary"
                                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % (detail.files?.length || 1))}
                                style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}
                            >
                                &gt;
                            </Button>
                        )}
                    </Col>
                </Row>
                {/* 상세 정보 */}
                <Row className="justify-content-center mb-5">
                    <Col xs={12}>
                        <Form>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Date:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.date} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Nick Name:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.nickName} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Plant Length:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.plantLength} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Leaf Count:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.leafCount} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Growth Status:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.growthStatus} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Water Supply:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.waterSupply} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Soil Type:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.soilType} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Fertilizer Type:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.fertilizerType} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Temperature:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.temperature} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Humidity:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" value={detail.humidity} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Growth Content:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" value={detail.growthContent} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5">
                                <Form.Label column sm="3">
                                    Remarks:
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" value={detail.remarks} readOnly />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => setShowDetailModal(false)} block>
                            닫기
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default DiaryDetailModal;
