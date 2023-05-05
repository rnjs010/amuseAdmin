import { useEffect, useState } from 'react';
import ProductSearch from '../ProductSearch/ProductSearch';
import styles from './ProductForm.module.css';
import TicketModal from '../../Modal/TicketModal';
import ContentModal from '../../Modal/ContentModal';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftjsToHtml from "draftjs-to-html";
import CourseModal from '../../Modal/CourseModal';
import axios from 'axios';

type Category = {
  name: string;
}

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

interface Course {
  title: string;
  timeCost: string;
  content: string;
  image: File;
}

type Product = {
  productId: string;
  category: string;
  title: string;
  location: {
    country: string;
    city: string;
  };
  mainImg: File[];
  ticket: Ticket[];
  mainInfo: string;
  course: Course[];
  extraInfo: string;
};


function ProductForm() {
  const [productId, setProductId] = useState<string>('');

  const handleProductID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  }

  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>([]);
  useEffect(
    () => {
      axios.get('/data/category.json')
        .then((res) => {
          setCategoryList(res.data);
        })
        .catch((err) => console.error(`failed to get categories: ${err}`));
    }, []
  );

  const handleProductCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }

  const [productName, setProductName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [mainImg, setMainImg] = useState<File[]>([]);

  const [mainInfoState, setMainInfoState] = useState<EditorState>(EditorState.createEmpty());
  const [mainInfoHtml, setMainInfoHtml] = useState<string>("");

  const updateMainInfoState = (mainInfoState: EditorState) => {
    setMainInfoState(mainInfoState);
  }

  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(mainInfoState.getCurrentContent()));
    setMainInfoHtml(html);
    console.log(html);
  }, [mainInfoState]);

  const [extraInfoState, setExtraInfoState] = useState<EditorState>(EditorState.createEmpty());
  const [extraInfoHtml, setExtraInfoHtml] = useState<string>("");

  const updateExtraInfoState = (extraInfoState: EditorState) => {
    setExtraInfoState(extraInfoState);
  }
  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(extraInfoState.getCurrentContent()));
    setExtraInfoHtml(html);
  }, [extraInfoState]);




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
    const files = event.target.files as FileList;
    if(files.length > 0){
      setMainImg((prev) => [...prev, ...Array.from(files)]);
    }
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

  const [courseModalOpen, setCourseModalOpen] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const toggleCourseModal = () => {
    setCourseModalOpen((prev) => !prev);
  }
  const handleCourseModal = (course:Course) => {
    toggleCourseModal();
    console.log(course);
    setCourseList((prev) => [...prev, course])
  }

  const handleAddProduct = () => {
    if(productId && category && productName && country && city && mainImg && ticketList && mainInfoHtml && courseList){
      const product: Product = {
        productId,
        category,
        title: productName,
        location: {
          country,
          city
        },
        mainImg: mainImg,
        ticket: ticketList,
        mainInfo: mainInfoHtml,
        course: courseList,  
        extraInfo: extraInfoHtml      
      };
      console.log(product);
    }
  }

  const uploadImageCallBack = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
  
    const clientId = 'YOUR_IMGUR_CLIENT_ID';
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });
  
    if (response.ok) {
      const jsonResponse = await response.json();
      return { data: { link: jsonResponse.data.link } };
    } else {
      throw new Error('Failed to upload image to Imgur');
    }
  };

  return (
    <div className={styles.productForm}>
        <div className={`${styles.container} ${styles.idAndCategory}`}>
      <div className={styles.category}>
        <span className={styles.title}>여행 카테고리</span>
        <select className={styles.categorySelect} onChange={handleProductCategory}>
          {categoryList.map(
            (category) => {
              return <option key={category} value={category}>{category}</option>
            }
          )}
        </select>
      </div>
      <div className={styles.code}>
          <span className={styles.title}>상품 코드</span>
          <input className={styles.productId} type="text" onChange={handleProductID}/>
      </div>
    </div>
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
            <input className={styles.mainImgInput} id="mainImgInput" onChange={handleMainImg} accept="image/png, image/jpeg" multiple type="file"/>
            <div>
              {mainImg.map((file) => {
                return <img 
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  className={styles.mainImgList}
                  />
              })}
            </div>
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
                  <li className={styles.ticketList} key={ticket.title}>
                    <p className={styles.ticketLabel}>티켓 제목</p><span>{ticket.title}</span>
                    <p className={styles.ticketLabel}>티켓 설명</p><span>{ticket.content}</span>
                    <ul>
                      <p className={styles.ticketLabel}>1인당 티켓 가격</p>
                      {ticket.priceList.map((price) => {
                        return(
                          <li className={styles.ticketPriceList} key={price.startDate}>
                            <p>{price.startDate} ~ {price.endDate} : {price.price}원</p>                            
                          </li>                    
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.content}`}>
          <div>
            <span className={styles.title}>상품 소개 관리</span>
            <Editor
              editorState={mainInfoState}
              onEditorStateChange={updateMainInfoState}
              editorStyle={{
                height: "400px",
                width: "100%",
                backgroundColor: "white",
                border: "3px solid lightgray",
                borderRadius: "10px",
                padding: "20px"
              }}
              toolbarStyle={{
                borderRadius: "10px"
              }}
              toolbar={{
                fontSize: {
                  options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48],
                },
                image: {
                  uploadCallback: uploadImageCallBack,
                  alt:{present: true, mandatory: false}
                },
              }
            }        
            />
          </div>
        </div>

        <div className={`${styles.container} ${styles.course}`}>
          <div>
            <span className={styles.title}>코스 관리</span>
            <button className={styles.addBtn} onClick={toggleCourseModal}>추가하기</button>
            {courseModalOpen && <CourseModal onSave={handleCourseModal} onToggle={toggleCourseModal}/>}
          </div>
          <div className={`${styles.status} ${styles.course}`}>
            <ul>
              {courseList.map((course) => {
                return (
                  <li className={styles.courseBox} key={course.title}>
                    <div className={styles.textInfo}>
                      <p>제목: {course.title}</p>
                      <p>소요시간: {course.timeCost}</p>
                      <p>설명: {course.content}</p>
                    </div>
                    <img className={styles.courseImg} src={URL.createObjectURL(course.image)} alt="Course" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.extraInfo}`}>
          <div>
            <span className={styles.title}>추가 정보 관리</span>
            <Editor
              editorState={extraInfoState}
              onEditorStateChange={updateExtraInfoState}
              editorStyle={{
                height: "400px",
                width: "100%",
                backgroundColor: "white",
                border: "3px solid lightgray",
                borderRadius: "10px",
                padding: "20px"
              }}
              toolbarStyle={{
                borderRadius: "10px"
              }}
              toolbar={{
                fontSize: {
                  options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48],
                }
              }
            }        
            />
          </div>
        </div>
        <div className={`${styles.container} ${styles.submit}`}>
            <button className={styles.submitBtn} onClick={handleAddProduct}>상품 등록하기</button>
        </div>
    </div>
  );
}

export default ProductForm;