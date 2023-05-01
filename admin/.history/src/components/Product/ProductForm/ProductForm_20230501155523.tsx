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
  productInfo: string;
  course: Course[];
};


function ProductForm() {
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleProductID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  }

  const handleProductCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }

  const [productName, setProductName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [mainImg, setMainImg] = useState<File[]>([]);

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState<string>("");

  const updateTextDescription = async(editorState: EditorState) => {
    setEditorState(editorState);
  }

  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    console.log(html);
  }, [editorState]);

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
    if(productName && country && city && mainImg && ticketList && htmlString && courseList){
      const product:Product = {
        productId,
        category,
        title: productName,
        location: {
          country,
          city
        },
        mainImg: mainImg,
        ticket: ticketList,
        productInfo: htmlString,
        course: courseList,        
      }
    }
  }


  return (
    <div className={styles.productForm}>
        <div className={`${styles.container}`}>
      <div className={styles.category}>
        <span className={styles.title}>여행 카테고리</span>
        <select onChange={handleProductCategory}>
          {categoryList.map(
            (category) => {
              return <option key={category.name} value={category.name}>{category.name}</option>
            }
          )}
        </select>
      </div>
      <div className={styles.code}>
          <span className={styles.title}>상품 코드</span>
          <input type="text" onChange={handleProductID}/>
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
            <Editor
              editorState={editorState}
              onEditorStateChange={updateTextDescription}
              localization={{locale: "ko"}}
              editorStyle={{
                height: "400px",
                width: "100%",
                backgroundColor: "white",
                border: "3px solid lightgray",
                padding: "20px"
              }}
              toolbar={{
                fontSize: {
                  options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48],
                }
              }}        
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
        <div className={`${styles.container} ${styles.submit}`}>
            <button className={styles.submitBtn} onClick={handleAddProduct}>상품 등록하기</button>
        </div>
    </div>
  );
}

export default ProductForm;