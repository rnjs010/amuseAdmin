import { useEffect, useState } from 'react';
import styles from './TicketModal.module.css';

interface Ticket {
  title: string,
  content: string,
  price: number
};

type MordalProps = {
  onSave(ticket:Ticket): void
};

function TicketModal({onSave}: MordalProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.currentTarget.value));
  };

  const handleSave = () => {
    if(title.length > 0 && content.length && price){
      const ticket:Ticket = {
        title: title,
        content: content,
        price: price
      };
      onSave(ticket);
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>티켓 관리</span>
          <button className={styles.exitBtn}>나가기</button>
        </header>
        <div className={styles.body}>
          <div className={`${styles.container} ${styles.title}`}>
            <p className={styles.label}>티켓 제목</p>
            <input className={`${styles.input} ${styles.title}`} value={title} onChange={handleTitle} type="text" />
          </div>
          <div className={`${styles.container} ${styles.content}`}>
            <p className={styles.label}>티켓 설명</p>
            <textarea className={`${styles.input} ${styles.content}`} onChange={handleContent}></textarea>
          </div>
          <div className={`${styles.container} ${styles.price}`}>
            <p className={styles.label}>티켓 가격</p>
            <input className={`${styles.input} ${styles.price}`} value={price} onChange={handlePrice} type="text" />
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default TicketModal;