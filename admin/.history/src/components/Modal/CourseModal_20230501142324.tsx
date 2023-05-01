import { useState } from 'react';
import styles from './CourseModal.module.css';

interface Course {
  title: string;
  timeCost: string;
  content: string;
  imageURL: string;
}

type MordalProps = {
  onSave(course:Course): void,
  onToggle(): void
};

function CourseModal({onSave, onToggle}: MordalProps) {
  const [title, setTitle] = useState<string>('');
  const [timeCost, setTimeCost] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');
  
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleTimeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeCost(event.currentTarget.value);
  };

  const handleSave = () => {
    if(title.length > 0 && content.length && timeCost){
      const course:Course = {
        title: title,
        timeCost: timeCost,
        content: content,
        imageURL: imageURL
      };
      onSave(course);
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>코스 관리</span>
          <button className={styles.exitBtn} onClick={onToggle}>나가기</button>
        </header>
        <div className={styles.body}>
          <div className={`${styles.container} ${styles.title}`}>
            <p className={styles.label}>코스 제목</p>
            <input className={`${styles.input} ${styles.title}`} value={title} onChange={handleTitle} type="text" />
          </div>
          <div className={`${styles.container} ${styles.timeCost}`}>
            <p className={styles.label}>코스 소요시간</p>
            <input className={`${styles.input} ${styles.timeCost}`} value={timeCost} onChange={handleTimeCost} type="text" />
          </div>
          <div className={`${styles.container} ${styles.content}`}>
            <p className={styles.label}>코스 설명</p>
            <textarea className={`${styles.input} ${styles.content}`} value={content} onChange={handleContent}></textarea>
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>추가</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default CourseModal;