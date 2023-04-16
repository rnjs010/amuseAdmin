import { useState } from 'react';
import ProductSearch from '../ProductSearch/ProductSearch';
import styles from './ProductForm.module.css';
import Modal from '../../Modal/Modal';

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
  const [ticket, setTicket] = useState<Ticket[]>([]);

  const toggleTicketModal = () => {
    setTicketModalOpen((prev) => !prev);
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
            {ticketModalOpen && <Modal onSave={toggleTicketModal} title={'티켓 관리'} />}
          </div>
          <div className={styles.status}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.content}`}>
          <div>
            <span className={styles.title}>상품 소개 관리</span>
            <button className={styles.addBtn}>추가하기</button>
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