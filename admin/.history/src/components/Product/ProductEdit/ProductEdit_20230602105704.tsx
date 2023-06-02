import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance';
import { useEffect, useState } from 'react';
import styles from '../ProductForm/ProductForm.module.css';
import MainImage from '../ProductForm/MainImage';
import TicketInfo from '../ProductForm/TicketInfo';
import MainInfo from '../ProductForm/MainInfo';
import CourseInfo from '../ProductForm/CourseInfo';
import ExtraInfo from '../ProductForm/ExtraInfo';

type HTML = string;

type Category = {
  name: string;
}

interface Ticket {
  title: string,
  content: string,
  count: number | null,
  priceList: Price[]
};

type Price = {
  startDate: string,
  endDate: string,
  quantity: string,
  weekdayPrices: {
    [key: string]: string
  }
}

interface Course {
  id: number | null;
  sequenceId: number;
  title: string;
  timeCost: string;
  content: string;
  image: ImageFile;
  location: {
    latitude: string;
    longitude: string;
  }
}

interface ImageFile {
  fileName: string,
  base64Data: string,
  imgUrl: string | undefined
}

type Product = {
  productId: string;
  category: string[];
  isConcierge: boolean;
  title: string;
  startPrice: number;
  admin: string;
  accessAuthority: {
    accessibleUserList: string[],
    accessibleTier: string
  }
  location: {
    country: string;
    city: string;
  };
  duration: string;
  startDate: string;
  endDate: string;
  mainImg: ImageFile[];
  ticket: Ticket[];
  mainInfo: string;
  course: Course[];
  extraInfo: HTML;
};

const userTierList = ['Bronze', 'Silver', 'Gold', 'Platinum'];


function ProductEdit() {
  const params = useParams();
  const productId = params.productId || '';

  const [category, setCategory] = useState<string[]>([]);
  const [isConcierge ,setIsConcierge] = useState<boolean>(false);

  const [productTitle, setProductTitle] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  

  const [accessibleTier, setAccessibleTier] = useState<string>('');
  const [accessibleUserList, setAccessibleUserList] = useState<string[]>([]);
  const [accessibleUser, setAccessibleUser] = useState<string>('');

  const [city, setCity] = useState<string>('');
  const [listingStartDate, setListingStartDate] = useState<string>('');
  const [listingEndDate, setListingEndDate] = useState<string>('');
  const [durationNights, setDurationNights] = useState<string>('');
  const [durationDays, setDurationDays] = useState<string>('');
  const [mainImg, setMainImg] = useState <ImageFile[]>([]);
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  const [mainInfo, setMainInfo] = useState<HTML>('');
  const [extraInfo, setExtraInfo] = useState<HTML>('');



  const [product, setProduct] = useState({
    productId: productId,
    option: "update",
    category: [],
    isConcierge: false,
    title: '',
    startPrice: 0,
    admin: 'daw916@naver.com',
    location: {
      country: '',
      city: ''
    },
    accessAuthority: {
      accessibleUserList: [],
      accessibleTier: ''
    },
    duration:``,
    startDate: '',
    endDate: '',
    mainImg: [],
    ticket: [],
    mainInfo: '',
    course: [],  
    extraInfo: '' 
  })
  
  useEffect(() => {
    axiosInstance.get(`/test/api/product/${productId}`)
      .then((res) => {
        console.log(res);
        const product = res.data.data;
        setProduct(product);
        setCategory(product.category);
        setIsConcierge(product.isConcierge);
        setProductTitle(product.title);
        setCountry(product.location.country);
        setCity(product.location.city);
        setAccessibleTier(product.accessAuthority.accessibleTier);
        setAccessibleUserList(product.accessAuthority.accessibleUserList);
        setDurationDays(product.duration);
        setDurationNights((parseInt(product.duration) - 1).toString());
        setListingStartDate(product.startDate.split(' ')[0]);
        setListingEndDate(product.endDate.split(' ')[0]);
        setMainImg(product.mainImg);
        setTicket(product.ticket);
        setMainInfo(product.mainInfo);
        setCourse(product.course);
        setExtraInfo(product.extraInfo);
      });
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);


  useEffect(() => {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥', course);
  }, [course])


    const handleIsConciergeOrNot = () => {
      setIsConcierge((prev) => !prev);
    }
  
  
    const renderUserTierOptions = () => {
      return userTierList.map((userClass) => {
        return (
          <option key={userClass} value={userClass}>
            {userClass}
          </option>
        );
      });
    }
  
  
  
    const handleAccessibleUserTier = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setAccessibleTier(event.target.value);
    }
  

    const handleAccessibleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccessibleUser(event.target.value);
    }
  
    const handleAddAccessibleUser = () => {
      setAccessibleUserList((prev) => [...prev, accessibleUser]);
      setAccessibleUser('');
    }
  
    const [categoryList, setCategoryList] = useState<string[]>([]);
    useEffect(
      () => {
        axiosInstance.get('/data/category.json')
          .then((res) => {
            setCategoryList(res.data);
          })
          .catch((err) => console.error(`failed to get categories: ${err}`));
      }, []);
  
    const handleProductCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if(!category.includes(event.target.value)){
        setCategory((prev) => [...prev, event.target.value]);
      }    
    }
  
    const renderCategoryOptions = () => {
      return categoryList.map((category) => {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        );
      });
    };
  
    const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductTitle(event.target.value);
    };
  
    const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCountry(event.target.value);
    };
  
    
    const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCity(event.target.value);
    };
  
    
    const handleListingStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      setListingStartDate(event.target.value);
    }
  
    
    const handleListingEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      setListingEndDate(event.target.value);
    }
  
    
    const handleDurationNights = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDurationNights(event.target.value);
    }
  
    
    const handleDurationDays = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDurationDays(event.target.value);
    }
  
    
    const handleMainImg = (imageFiles: ImageFile[]) => {
      setMainImg((prev) => [...prev, ...imageFiles]);
    }
  
    const removeMainImg = (imageFile: ImageFile) => {
      setMainImg((prev) => prev.filter(
        (img) => img.imgUrl !== imageFile.imgUrl
      ));
    }
    
    
    const handleTicket = (ticket:Ticket) => {
      setTicket((prev) => [...prev, ticket])
    }
  
    const removeTicket = (selectedTicket: Ticket) => {
      
      setTicket((prev) => prev.filter(
        (ticket) => ticket.title !== selectedTicket.title
      ));
    }
  
    const handleCourse = (course:Course) => {
      setCourse((prev) => [...prev, course])
    }
  
    const removeCourse = (selectedCourse:Course) => {
      setCourse((prev) => prev.filter(
        (course) => course.title !== selectedCourse.title
      ));
    }
  
    
    const handleMainInfo = (html:HTML) => {
      setMainInfo(html);
    }
  
    
    const handleExtraInfo = (html: HTML) => {
      setExtraInfo(html);
    }
  
    const handleAddProduct = () => {
        const product: Product = {
          productId,
          category,
          isConcierge: false,
          title: productTitle,
          startPrice: 9999,
          admin: 'daw916@naver.com',
          location: {
            country,
            city
          },
          accessAuthority: {
            accessibleUserList,
            accessibleTier
          },
          duration:`${durationNights}박 ${durationDays}일`,
          startDate: listingStartDate,
          endDate: listingEndDate,
          mainImg,
          ticket,
          mainInfo,
          course,  
          extraInfo  
        };
        console.log(product);
      const jsonString = JSON.stringify(product);
      const byteSize = new Blob([jsonString], {type: 'application/json'}).size;
      console.log('byteSize: ', byteSize);
      axiosInstance.post('/test/api/product/create', product)
      .then((res) => {
        console.log(JSON.stringify(res));
        alert(`
          여행 상품 등록에 성공했습니다.
          ${JSON.stringify(res)}
        `)
      })
      .catch((err) => {
        console.error(err);
        alert(`
          여행 상품 등록에 실패했습니다.
          ${err}
        `)
      }    
      );
    }
  
  return (
    <div className={styles.productForm}>

        <section>
          <div className={styles.sectionTitle}>상품 분류</div>
          <div className={styles.sectionDivider}></div>
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
              {/* <input className={styles.productId} type="text" onChange={handleProductID}/> */}
          </div>
          <div className={styles.isConcierge}>
            <span>컨시어지 여부</span>
            <input className={styles.isConciergeCheck} type="checkbox" onChange={handleIsConciergeOrNot}/>
          </div>
          </div>
        </section>
        

        {isConcierge && (
          <section>
            <div className={styles.sectionTitle}>접근 권한 설정</div>
            <div className={styles.sectionDivider}></div>
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
          </section>
         
          )
        }

      <section>
        <div className={styles.sectionTitle}>기본 사항</div>
        <div className={styles.sectionDivider}></div>
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
      </section>
        
    <section>
        <div className={styles.sectionTitle}>메인 이미지</div>
        <div className={styles.sectionDivider}></div>
        <MainImage option={"edit"} mainImgProp={mainImg} onAdd={handleMainImg} onRemove={removeMainImg}/>
    </section>    
        <TicketInfo ticketProps={ticket} onAdd={handleTicket} onRemove={removeTicket}/>

        <MainInfo htmlProps={mainInfo} onChange={handleMainInfo}/>

        <CourseInfo courseProps={course} onAdd={handleCourse} onRemove={removeCourse} />

        <ExtraInfo htmlProps={extraInfo} onChange={handleExtraInfo} />

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