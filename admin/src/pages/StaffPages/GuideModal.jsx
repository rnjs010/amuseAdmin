import { useState } from 'react';
import styles from './GuideModal.module.css';
import axios from 'axios';
import { getGuideInfo } from './StaffDetail';

export default function GuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [email, setEmail] = useState('');
  const [guideCode, setGuideCode] = useState('');
  const [guideImg, setGuideImg] = useState();
  const [previewImg, setPreviewImg] = useState('');
  const [fileName, setFileName] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGuideImg(event.target.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handlePreview = () => {
    setPreviewImg(guideImg);
  };

  const handleAddGuide = () => {
    axios.post(`https://ammuse.store/test/api/crate/guide`, {
      name: name,
      email: email,
      guideCode: guideCode,
      introduce: introduction,
      fileName: fileName,
      base64Data: guideImg
    })
    .then((res)=>{
      console.log(res);
      setName('');
      setEmail('');
      setGuideCode('');
      setIntroduction('');
      setGuideImg();
      closeModal();
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      <button onClick={openModal} className={styles.guideBtn}>추가하기</button>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>
                <h2 style={{marginBottom: '12px'}}>가이드 추가하기</h2>
                {guideImg && (
                  <div>
                    <img
                      src={guideImg}
                      alt="Selected"
                      className={styles.previewImage}
                      style={{width: '150px', height: '150px'}}
                    />
                  </div>
                )}
                <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                />
            </div>
            <input 
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            placeholder='이름'/>
            <input 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='이메일'
            />
            <input value={guideCode}
            onChange={(e)=>setGuideCode(e.target.value)}
            placeholder='직원 코드'/>
            <div>
                <textarea
                value={introduction} 
                onChange={(e)=>setIntroduction(e.target.value)}
                placeholder='직원 소개'/>
            </div>
            <button className={styles.modalClose} onClick={handleAddGuide}>
                추가하기
            </button>
            <button className={styles.modalClose} onClick={closeModal}>
                CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}