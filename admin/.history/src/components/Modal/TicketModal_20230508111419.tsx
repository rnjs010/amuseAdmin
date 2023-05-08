import { useEffect, useState } from 'react';
import styles from './TicketModal.module.css';

interface Ticket {
  title: string,
  content: string,
  priceList: Price[]
};

type Price = {
  startDate: string,
  endDate: string,
  price: string
}

type MordalProps = {
  onSave(ticket:Ticket): void,
  onToggle(): void
};

function TicketModal({onSave, onToggle}: MordalProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<Price>(
    {
      startDate: '',
      endDate: '',
      price: ''
    }
  );
  const [priceList, setPriceList] = useState<Price[]>([]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice((prev) => (
      {...prev, startDate: event.target.value}
    ));
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice((prev) => (
      {...prev, endDate: event.target.value}
    ));
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice((prev) => (
      {...prev, price: event.target.value}
    ));
  };

  const addPriceToPriceList = () => {
    if(price.startDate && price.endDate && price.price){
      setPriceList((prev) => (
        [...prev, price]
      ));
      setPrice({
        startDate: '',
        endDate: '',
        price: ''
      })
    }
  }

  const handleSave = () => {
    if(title.length > 0 && content.length && price){
      const ticket:Ticket = {
        title: title,
        content: content,
        priceList: priceList
      };
      onSave(ticket);
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>티켓 관리</span>
          <button className={styles.exitBtn} onClick={onToggle}>나가기</button>
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
            <div className={styles.priceInputContainer}>
              <div className={styles.dateInput}>
                <p>시작일</p>
                <input id="startDate" name="startDate" type="date" value={price.startDate} onChange={handleStartDate}/>
              </div>
              <div className={styles.dateInput}>
                <p>종료일</p>
                <input id="endDate" name="endDate" type="date" value={price.endDate} onChange={handleEndDate}/>
              </div>
              {/* <div className={styles.priceInput}>
                <p>티켓 가격</p>
                <input id="price" name="price" type="text" value={price.price} onChange={handlePrice}/>
              </div>
              <button className={styles.addBtn} onClick={addPriceToPriceList} >추가</button> */}
          </div>
          <div>
                <p>요일별 가격 설정</p>
                <input type="checkbox" id="monday" />
                <label htmlFor="monday">월</label>
                <input type="checkbox" id="tuesday" />
                <label htmlFor="tuesday">화</label>
                <input type="checkbox" id="wednesday" />
                <label htmlFor="wednesday">수</label>
                <input type="checkbox" id="thursday" />
                <label htmlFor="thursday">목</label>
                <input type="checkbox" id="friday" />
                <label htmlFor="friday">금</label>
                <input type="checkbox" id="saturday" />
                <label htmlFor="saturday">토</label>
                <input type="checkbox" id="sunday" />
                <label htmlFor="sunday">일</label>
          </div>
            {/* <div className={styles.priceStatusContainer}>
              <ul>
                {priceList.map((price) => {
                  return  (
                            <li key={price.startDate} className={styles.priceStatus}>
                              <p>시작일</p>
                              <span>{price.startDate}</span> 
                              <p>종료일</p>
                              <span>{price.endDate}</span>                              
                              <p>가격</p>
                              <span>{price.price}</span> 
                            </li>
                          )
                })}
              </ul>
            </div> */}
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default TicketModal;