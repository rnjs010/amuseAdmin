import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

// 모달 스타일 설정 (선택사항)
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    width: "600px",
    height: "500px",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    zIndex: 10
  },
};

const ModalComponent = ({ guideInfo, isOpen, closeModal, onSelectGuide }) => {
  const [selectedGuide, setSelectedGuide] = useState(1);

  if (!isOpen || !guideInfo || guideInfo.length === 0) {
    return null;
  }

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide.guideCode);
    onSelectGuide(guide);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles} shouldCloseOnOverlayClick={true}>
      <h2 style={{ marginBottom: "10px" }}>가이드 정보</h2>
      <div>
        {guideInfo.map((guide) => (
          <div style={{ marginBottom: "10px" ,display:"flex", flexDirection:"row", justifyContent:"space-between"}} key={guide.guide_db_id}>
            <div style={{width:"65%",display:"flex", flexDirection:"row"}}>
              <img src={`${guide.profileImageUrl}`} style={{width:32, height:32, borderRadius:16, marginRight:24}}/>
              {/* <input
                  type="radio"
                  value="guideCode"
                  checked={selectedGuide === guide.guideCode}
                  style={{marginRight:24}}
                  onChange={() => handleGuideSelect(guide)}
                /> */}
              <label>
                <p>이름: {guide.userName}</p>
                <p>가이드 코드: {guide.guideCode}</p>
              </label>
            </div>
            <SelectedGuideBtn
              onClick={() => handleGuideSelect(guide)}
            >{"선택"}
            </SelectedGuideBtn> 
          </div>
        ))}
      </div>
{/* <button onClick={closeModal}>저장</button> */}
    </Modal>
  );
};

export default ModalComponent;


const SelectedGuideBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  background-color: var(--color-pink);
  color: var(--color-white);
  width: 60px;
  height: 32px;
  border-radius:8px;
  cursor:pointer;

  &:hover{
    background-color: #e2e2e2; 
    color: var(--color-pink);
  }
`;