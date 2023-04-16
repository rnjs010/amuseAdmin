import styles from './Modal.module.css';

type MordalProps = {
  title: string,
  onSave(): void
}
function Modal({onSave, title}: MordalProps) {
  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>{title}</header>
        <div className={styles.body}>
          <div className={`${styles.container} ${styles.title}`}>
            <p className={styles.label}>티켓 제목</p>
            <input className={`${styles.input} ${styles.title}`} type="text" />
          </div>
          <div className={`${styles.container} ${styles.content}`}>
            <p className={styles.label}>티켓 설명</p>
            <textarea className={`${styles.input} ${styles.content}`}></textarea>
          </div>
          <div className={`${styles.container} ${styles.price}`}>
            <p className={styles.label}>티켓 가격</p>
            <input className={`${styles.input} ${styles.price}`} type="text" />
          </div>
        </div>
        <button className={styles.saveBtn} onClick={onSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default Modal;