import { useEffect, useState } from 'react';
import styles from './TicketModal.module.css';
import {IoMdRemoveCircle} from 'react-icons/io';

interface Ticket {
  title: string,
  content: string,
  priceList: Price[]
};

type Price = {
  startDate: string,
  endDate: string,
  weekdayPrices: {
    [key: string]: string
  }
}

type MordalProps = {
  onSave(ticket:Ticket): void,
  onToggle(): void
};

function TicketModal({onSave, onToggle}: MordalProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [defaultPrice, setDefaultPrice] = useState<string>('');

  const [price, setPrice] = useState<Price>(
    {
      startDate: '',
      endDate: '',
      weekdayPrices: {
        'Monday': '',
        'Tuesday': '',
        'Wednesday': '',
        'Thursday': '',
        'Friday': '',
        'Saturday': '',
        'Sunday': ''
      }
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


  const handleWeekdayPrice = (event: React.ChangeEvent<HTMLInputElement>, weekday: string) => {
    setPrice((prev) => (
      {
        ...prev,
        weekdayPrices: {
          ...prev.weekdayPrices,
          [weekday]: event.target.value
        }
      }
    ));
  };

  const addPriceToPriceList = () => {
    console.log(price);
    if(price.startDate && price.endDate){
      setPriceList((prev) => (
        [...prev, price]
      ));
      setDefaultPrice('');
      setPrice({
        startDate: '',
        endDate: '',
        weekdayPrices: {
          'Monday': '',
          'Tuesday': '',
          'Wednesday': '',
          'Thursday': '',
          'Friday': '',
          'Saturday': '',
          'Sunday': ''
        }
      })
    }
  }

  const removeTicketPrice = (startDate: string) => {
    setPriceList((prevPrices) => prevPrices.filter((price) => price.startDate !== startDate));
  }

  const handleSave = () => {
  {
      const ticket:Ticket = {
        title: title,
        content: content,
        priceList: priceList
      };
      onSave(ticket);
    }
  };

  const handleDefaultPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultPrice(event.target.value);
    setPrice((prev) => ({
      ...prev,
      weekdayPrices: {
        'Monday': event.target.value,
          'Tuesday': event.target.value,
          'Wednesday': event.target.value,
          'Thursday': event.target.value,
          'Friday': event.target.value,
          'Saturday': event.target.value,
          'Sunday': event.target.value
      }
    }))
  }

  const [validWeekDays, setValidWeekDays] = useState(
    [
      ['sun', false],
      ['mon', false],
      ['tue', false],
      ['wed', false],
      ['thu', false],
      ['fri', false],
      ['sat', false],
    ]
  )

  useEffect(() => {
    const startDate = new Date(price.startDate);
    const endDate = new Date(price.endDate);

    const updatedWeekDays = [...validWeekDays];

    validWeekDays.forEach((weekday, idx) => {
      console.log(weekday, idx);
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)){
        console.log(date.getDay(), idx);
        if(date.getDay() == idx){
          updatedWeekDays[idx] = [weekday[0], true];
          console.log(date.getDay(), idx, updatedWeekDays);
          break;
        }
        else {
          continue;
        }
      }
    })

    console.log(updatedWeekDays);
    setValidWeekDays(updatedWeekDays);
  }, [price.endDate])

  const renderWeekDaysPriceInput = () => {
    return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(weekday => (
      <div className={styles.weekdayPriceInput} key={weekday}>
        <p>{weekday}</p>
        <input
          id={`price-${weekday}`}
          name={`price-${weekday}`}
          type="text"
          placeholder="₩"
          value={price.weekdayPrices[weekday]}
          onChange={event => handleWeekdayPrice(event, weekday)}
          className={styles.weekDayPrice}                    
        />                  
      </div>
    ))
  }

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
              <div className={styles.dateInput}>
                <p>기본 가격</p>
                <input id="defaultPrice" name="defaultPrice" type="text" value={defaultPrice} onChange={handleDefaultPrice} placeholder="₩"/>
              </div>
          </div>
          <div className={styles.weekDaysPrice}>
            {renderWeekDaysPriceInput()}
          </div>
          <button className={styles.addBtn} onClick={addPriceToPriceList} >추가</button>

          <div className={styles.priceStatusContainer}>
            <ul>
              {priceList.map((price) => {
                return  (
                          <li key={price.startDate} className={styles.priceStatus}>
                            <div className={styles.priceStatusDate}>
                              <p>시작일</p>
                              <span>{price.startDate}</span> 
                              <p>종료일</p>
                              <span>{price.endDate}</span>
                              <button className={styles.removeBtn} onClick={() => removeTicketPrice(price.startDate)}><IoMdRemoveCircle/></button>                              
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
                      })
              }
            </ul>
          </div>
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default TicketModal;