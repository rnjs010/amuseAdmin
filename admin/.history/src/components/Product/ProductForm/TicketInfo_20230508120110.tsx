import { useState } from 'react';
import styles from './TicketInfo.module.css';
import TicketModal from '../../Modal/TicketModal';

type Price = {
  startDate: string,
  endDate: string,
  weekdayPrices: {
    [key: string]: string
  }
}

interface Ticket {
  title: string,
  content: string,
  priceList: Price[]
};

interface TicketInfoProps {
  onAdd(ticket: Ticket): void,
}

function TicketInfo({onAdd}: TicketInfoProps) {
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const toggleTicketModal = () => {
    setTicketModalOpen((prev) => !prev);
  }
  const handleTicketModal = (ticket:Ticket) => {
    toggleTicketModal();
    setTicketList((prev) => [...prev, ticket]);
    onAdd(ticket);
  }

  const renderTicketList = () => {
    return (
      <ul>
        {ticketList.map((ticket) => {
          return (
            <li className={styles.ticketList} key={ticket.title}>
              <p className={styles.ticketLabel}>티켓 제목</p><span>{ticket.title}</span>
              <p className={styles.ticketLabel}>티켓 설명</p><span>{ticket.content}</span>
              <ul>
                <p className={styles.ticketLabel}>1인당 티켓 가격</p>
                {ticket.priceList.map((price) => {
                  return(
                    <li className={styles.ticketPriceList} key={price.startDate}>
                      <div className={styles.priceStatusDate}>
                          <p>시작일</p>
                          <span>{price.startDate}</span> 
                          <p>종료일</p>
                          <span>{price.endDate}</span>                              
                      </div>        
                      <div className={styles.priceStatusWeekDayPrice}>
                          {Object.entries(price.weekdayPrices).map(([weekday, weekdayPrice]) => (
                            <div key={weekday} className={styles.weekdayPriceStatus}>
                                <p>{weekday}</p>
                                <span>{weekdayPrice}</span>
                            </div>))}
                       </div>
                    </li>                    
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  };
  
  return (
    <div className={`${styles.container} ${styles.ticket}`}>
          <div>
            <span className={styles.title}>티켓 관리</span>
            <button className={styles.addBtn} onClick={toggleTicketModal}>추가하기</button>
            {ticketModalOpen && <TicketModal onSave={handleTicketModal} onToggle={toggleTicketModal}/>}
          </div>
          <div className={`${styles.status} ${styles.ticket}`}>
            {renderTicketList()}
          </div>
    </div>
  );
}

export default TicketInfo;