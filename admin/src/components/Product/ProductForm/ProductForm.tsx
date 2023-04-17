import { useState } from 'react';
import ProductSearch from '../ProductSearch/ProductSearch';
import styles from './ProductForm.module.css';
import TicketModal from '../../Modal/TicketModal';
import ContentModal from '../../Modal/ContentModal';

interface Ticket {
  title: string,
  content: string,
  price: number
}

function ProductForm() {
  
  const [productName, setProductName] = useState<string>('');

  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const toggleTicketModal = () => {
    setTicketModalOpen((prev) => !prev);
  }
  const handleTicketModal = (ticket:Ticket) => {
    toggleTicketModal();
    console.log(ticket);
    setTicketList((prev) => [...prev, ticket]);
  }

  const [contentModalOpen, setContentModalOpen] = useState<boolean>(false);
  const toggleContentModal = () => {
    setContentModalOpen((prev) => !prev);
  }
  const handleContentModal = () => {
    toggleContentModal();
  }
  

  return (
    <div>
        <ProductSearch isDeleting={false}/>
        <div className={`${styles.container} ${styles.name}`}>
            <span className={` ${styles.title} ${styles.name}`}>여행 상품명</span>
            <input className={`${styles.nameInput}`} value={productName} onChange={handleProductName} type="text"/>
        </div>

        <div className={`${styles.container} ${styles.ticket}`}>
          <div>
            <span className={styles.title}>티켓 관리</span>
            <button className={styles.addBtn} onClick={toggleTicketModal}>추가하기</button>
            {ticketModalOpen && <TicketModal onSave={handleTicketModal} />}
          </div>
          <div className={`${styles.status} ${styles.ticket}`}>
            <ul>
              {ticketList.map((ticket) => {
                return (
                  <li className={styles.ticketBox} key={ticket.title}>
                    <p>{ticket.title}</p>
                    <p>설명: {ticket.content}</p>
                    <span>가격: {ticket.price}원</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.content}`}>
          <div>
            <span className={styles.title}>상품 소개 관리</span>
            <button className={styles.addBtn} onClick={toggleContentModal}>추가하기</button>
            {contentModalOpen && <ContentModal onSave={handleContentModal}/>}
          </div>
          <div className={styles.status}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
    </div>
  );
}

export default ProductForm;