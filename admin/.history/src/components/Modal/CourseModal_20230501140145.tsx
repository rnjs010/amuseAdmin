import styles from './TicketModal.module.css';

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
  const handleSave = () => {
    // onSave();
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>코스 관리</header>
        <div className={styles.body}>

        </div>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default CourseModal;