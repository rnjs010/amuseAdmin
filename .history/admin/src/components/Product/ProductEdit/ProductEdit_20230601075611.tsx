import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance';
import { useEffect } from 'react';
import styles from './ProductForm.module.css';
import MainImage from '../ProductForm/MainImage';
import TicketInfo from '../ProductForm/TicketInfo';
import MainInfo from '../ProductForm/MainInfo';
import CourseInfo from '../ProductForm/CourseInfo';
import ExtraInfo from '../ProductForm/ExtraInfo';

function ProductEdit() {
  const params = useParams();
  const productId = params.productId;
  useEffect(() => {
    axiosInstance.get(`/test/api/product/${productId}`)
      .then((res) => console.log(res));
  }, [])
  
  return (
<div className={styles.productForm}>
        <div className={`${styles.container} ${styles.idAndCategory}`}>
          <div className={styles.category}>
            <span className={styles.title}>여행 카테고리</span>
            <select className={styles.categorySelect} onChange={handleProductCategory}>
              <option value="">카테고리 선택</option>
              {renderCategoryOptions()}
            </select>
            <div className={styles.categoryStatus}>
              {category.map(categoryName => 
                <li key={categoryName}>{categoryName}</li>
              )}
            </div>
          </div>
          <div className={styles.code}>
              <span className={styles.title}>상품 코드</span>
              <input className={styles.productId} type="text" onChange={handleProductID}/>
          </div>
          <div className={styles.isConcierge}>
            <span>컨시어지 여부</span>
            <input className={styles.isConciergeCheck} type="checkbox" onChange={handleIsConciergeOrNot}/>
          </div>
        </div>

        {isConcierge && (
          <div className={`${styles.container} ${styles.accessAuthority}`}>
              <div className={`${styles.controller } ${styles.accessAuthority}`}>
                <div className={styles.accessibleUser}>
                  <span className={styles.title}>접근 가능 회원 ID</span>
                  <input className={styles.accessibleUserInput} value={accessibleUser} onChange={handleAccessibleUser} type="text"/>
                  <button className={styles.addBtn} onClick={handleAddAccessibleUser}>추가</button>
                </div>
                <div className={styles.accessibleTier}>
                  <span className={styles.title}>등급 설정</span>
                  <select value={accessibleTier} onChange={handleAccessibleUserTier}>
                    <option value="">등급 선택</option>
                    {renderUserTierOptions()}
                  </select>
                </div>
              </div>
              {
                accessibleUserList && ( 
                    <div className={styles.accessibleUserList}>
                      <ul>
                        {accessibleUserList.map((user) => ( <li>{user}</li>))}
                      </ul>                      
                    </div>
                )
              }
          </div>
          )
        }

        <div className={`${styles.container} ${styles.name}`}>
            <span className={` ${styles.title} ${styles.name}`}>여행 상품명</span>
            <input className={`${styles.nameInput}`} value={productTitle} onChange={handleProductName} type="text"/>
        </div>

        <div className={`${styles.container} ${styles.locationAndDuration}`}>
            <div className={styles.country}>
              <span className={styles.title}>국가</span>
              <input value={country} onChange={handleCountry} type="text"/>
            </div>
            <div className={styles.city}>
              <span className={styles.title}>도시</span>
              <input value={city} onChange={handleCity} type="text"/>
            </div>
            <div className={styles.productPeriod}>
              <span className={styles.title}>상품 게재 기간</span>
              <input value={listingStartDate} onChange={handleListingStartDate} type="date"/>
              <span> ~ </span>
              <input value={listingEndDate} onChange={handleListingEndDate} type="date"/>
            </div>
            <div className={styles.duration}>
              <span className={styles.title}>여행 기간</span>
              <input className={styles.duration_input} value={durationNights} onChange={handleDurationNights} type="text" placeholder='' maxLength={2}/>
              <span className={styles.title}>박</span>
              <input className={styles.duration_input} value={durationDays} onChange={handleDurationDays} type="text" placeholder='' maxLength={2}/>
              <span className={styles.title}>일</span>
            </div>
        </div>

        <MainImage onAdd={handleMainImg} onRemove={removeMainImg}/>

        <TicketInfo onAdd={handleTicket} onRemove={removeTicket}/>

        <MainInfo onChange={handleMainInfo}/>

        <CourseInfo onAdd={handleCourse} onRemove={removeCourse} />

        <ExtraInfo onChange={handleExtraInfo} />

        <div className={`${styles.container} ${styles.guide}`}>
              <div className={styles.guideProfile}>
                <div className={styles.guideImg}></div>
                <p className={styles.guideName}>name</p>
                <p className={styles.guideCode}>1234-1234-1234</p>
              </div>                  
              <div className={styles.divider}></div>
              <textarea className={styles.guideTextArea} placeholder='내용을 입력하세요.'></textarea>
              <button className={styles.guideGetBtn}>가이드 불러오기</button>
        </div>

        <div className={`${styles.container} ${styles.submit}`}>
            <button className={styles.submitBtn} onClick={handleAddProduct}>상품 등록하기</button>
        </div>
    </div>
  );
}

export default ProductEdit;