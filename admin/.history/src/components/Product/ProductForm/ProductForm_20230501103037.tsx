import { useState } from 'react';
import ProductSearch from '../ProductSearch/ProductSearch';
import styles from './ProductForm.module.css';
import TicketModal from '../../Modal/TicketModal';
import ContentModal from '../../Modal/ContentModal';


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

type Product = {
  productId: string;
  category: string;
  title: string;
  location: {
    country: string;
    city: string;
  };
  mainImg: {
    imageURL: string;
  }[];
  ticket: {
    title: string;
    content: string;
    priceList: {
      startDate: string;
      endDate: string;
      price: string;
    }[];
  }[];
  productInfo: string;
  course: {
    title: string;
    timeCost: string;
    content: string;
    imageURL: string;
  }[];
  extraInfo: string;
};


function ProductForm() {

  const [productName, setProductName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [mainImg, setMainImg] = useState<string[]>([]);

  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleMainImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainImg((prev) => [
        ...prev,
        event.target.value
      ]
    )
  }

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

        <div className={`${styles.container} ${styles.location}`}>
            <div className={styles.country}>
              <span className={styles.title}>국가</span>
              <input className={`${styles.countryInput}`} value={country} onChange={handleCountry} type="text"/>
            </div>
            <div className={styles.city}>
              <span className={styles.title}>도시</span>
              <input className={`${styles.cityInput}`} value={city} onChange={handleCity} type="text"/>
            </div>
        </div>

        <div className={`${styles.container} ${styles.mainImg}`}>
            <span className={` ${styles.title} ${styles.mainImg}`}>메인 이미지</span>
            <input className={`${styles.mainImgInput}`} id={"mainImgInput"} accept="image/png, image/jpeg" multiple type="file"/>
        </div>

        <div className={`${styles.container} ${styles.ticket}`}>
          <div>
            <span className={styles.title}>티켓 관리</span>
            <button className={styles.addBtn} onClick={toggleTicketModal}>추가하기</button>
            {ticketModalOpen && <TicketModal onSave={handleTicketModal} onToggle={toggleTicketModal}/>}
          </div>
          <div className={`${styles.status} ${styles.ticket}`}>
            <ul>
              {ticketList.map((ticket) => {
                return (
                  <li className={styles.ticketBox} key={ticket.title}>
                    <p>{ticket.title}</p>
                    <p>설명: {ticket.content}</p>
                    <span>가격: 원</span>
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