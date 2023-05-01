import styles from './TicketModal.module.css';

type MordalProps = {
  onSave(): void
};

function CourseModal({onSave}: MordalProps) {

  const handleSave = () => {
    onSave();
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