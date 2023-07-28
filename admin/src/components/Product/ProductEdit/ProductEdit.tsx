import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { useEffect, useState } from "react";
import styles from "../ProductForm/ProductForm.module.css";
import MainImage from "../ProductForm/MainImage";
import TicketInfo from "../ProductForm/TicketInfo";
import MainInfo from "../ProductForm/MainInfo";
import CourseInfo from "../ProductForm/CourseInfo";
import ExtraInfo from "../ProductForm/ExtraInfo";
import { IoMdRemoveCircle } from "react-icons/io";
import { Cookies, useCookies } from "react-cookie";

type HTML = string;

type Category = {
  name: string;
};

interface Ticket {
  title: string;
  content: string;
  count: number | null;
  priceList: Price[];
}

type Price = {
  startDate: string;
  endDate: string;
  quantity: string;
  weekdayPrices: {
    [key: string]: string;
  };
};

interface Course {
  id: number | null;
  sequenceId: number;
  day: number;
  title: string;
  timeCost: string;
  content: string;
  image: ImageFile;
  location: {
    latitude: string;
    longitude: string;
  };
}

interface ImageFile {
  id: number | null;
  fileName: string;
  base64Data: string;
  imgUrl: string | undefined;
}

type Product = {
  id: null | number;
  productId: string;
  option: string;
  category: string[];
  title: string;
  startPrice: number;
  admin: string;
  updateAdmin: string | null;
  accessAuthority: {
    accessibleUserList: string[];
    accessibleTier: string;
  };
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

const userTierList = ["Bronze", "Silver", "Gold", "Platinum"];

function ProductEdit() {
  const params = useParams();
  const productId = params.productId || "";

  const [product, setProduct] = useState({
    productId: productId,
    option: "update",
    category: [],
    isConcierge: false,
    title: "",
    startPrice: 0,
    admin: "daw916@naver.com",
    location: {
      country: "",
      city: "",
    },
    accessAuthority: {
      accessibleUserList: [],
      accessibleTier: "",
    },
    duration: ``,
    startDate: "",
    endDate: "",
    mainImg: [],
    ticket: [],
    mainInfo: "",
    course: [],
    extraInfo: "",
  });

  const [dbId, setDbId] = useState<number>(0);

  const [category, setCategory] = useState<string[]>([]);
  const [isConcierge, setIsConcierge] = useState<boolean>(false);

  const [productTitle, setProductTitle] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [accessibleTier, setAccessibleTier] = useState<string>("");
  const [accessibleUserList, setAccessibleUserList] = useState<string[]>([]);
  const [accessibleUser, setAccessibleUser] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [listingStartDate, setListingStartDate] = useState<string>("");
  const [listingEndDate, setListingEndDate] = useState<string>("");
  const [durationNights, setDurationNights] = useState<string>("");
  const [durationDays, setDurationDays] = useState<string>("");
  const [mainImg, setMainImg] = useState<ImageFile[]>([]);
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  const [mainInfo, setMainInfo] = useState<HTML>("");
  const [extraInfo, setExtraInfo] = useState<HTML>("");
  const [cookies] = useCookies(["id"]);
  const accessToken = cookies.id;
  useEffect(() => {
    axiosInstance
      .get(`/test/api/product/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        console.log("🔥", res);
        const product = res.data.data;
        setProduct(product);
        setDbId(product.id);
        setCategory(product.category);
        setAccessibleTier(product.accessAuthority.accessibleTier);
        setAccessibleUserList(product.accessAuthority.accessibleUserList);
        setProductTitle(product.title);
        setCountry(product.location.country);
        setCity(product.location.city);
        setDurationDays(product.duration);
        setDurationNights((parseInt(product.duration) - 1).toString());
        setListingStartDate(product.startDate.split(" ")[0]);
        setListingEndDate(product.endDate.split(" ")[0]);
        setMainImg(product.mainImg);
        setTicket(product.ticket);
        setMainInfo(product.mainInfo);
        setCourse(product.course);
        setExtraInfo(product.extraInfo);
      });
  }, []);

  // useEffect(() => {
  //   console.log('product', product);
  // }, [product]);

  // ---Category
  const [categoryList, setCategoryList] = useState<string[]>([]);
  useEffect(() => {
    axiosInstance
      .get("/test/api/category/list")
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((err) => console.error(`failed to get categories: ${err}`));
  }, []);

  const handleProductCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!category.includes(event.target.value)) {
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  const renderCategoryOptions = () => {
    return categoryList.map((category) => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  };

  useEffect(() => {
    if (category.includes("컨시어지")) {
      setIsConcierge(true);
    } else {
      setIsConcierge(false);
      setAccessibleTier("");
      setAccessibleUserList([]);
    }
  }, [category]);

  const handleDeleteCategory = (clickedCategory: string) => {
    setCategory(category.filter((category) => category !== clickedCategory));
  };

  //---Category

  //---Access Authority
  const renderUserTierOptions = () => {
    return userTierList.map((userClass) => {
      return (
        <option key={userClass} value={userClass}>
          {userClass}
        </option>
      );
    });
  };

  const handleAccessibleUserTier = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccessibleTier(event.target.value);
  };

  const handleAccessibleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessibleUser(event.target.value);
  };

  const handleAddAccessibleUser = () => {
    setAccessibleUserList((prev) => {
      if (prev === null) {
        return [accessibleUser];
      } else {
        return [...prev, accessibleUser];
      }
    });
    setAccessibleUser("");
  };

  //---Access Authority

  //---Title
  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductTitle(event.target.value);
  };
  //---Title

  //---Location
  const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  //---Location

  //---Listing Date
  const handleListingStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingStartDate(event.target.value);
  };

  const handleListingEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingEndDate(event.target.value);
  };
  //---Listing Date

  //---Duration

  const handleDurationNights = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationNights(event.target.value);
  };

  const handleDurationDays = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationDays(event.target.value);
  };

  //---Duration

  //---Main Images

  const handleMainImg = (imageFiles: ImageFile[]) => {
    setMainImg((prev) => [...prev, ...imageFiles]);
  };

  const removeMainImg = (imageFile: ImageFile) => {
    setMainImg((prev) => prev.filter((img) => img.imgUrl !== imageFile.imgUrl));
  };
  //---Main Images

  //---Ticket
  const handleTicket = (ticket: Ticket) => {
    setTicket((prev) => [...prev, ticket]);
  };
  const removeTicket = (selectedTicket: Ticket) => {
    setTicket((prev) => prev.filter((ticket) => ticket.title !== selectedTicket.title));
  };

  //---Ticket

  //---Main Info

  const handleMainInfo = (html: HTML) => {
    setMainInfo(html);
  };

  //---Main Info

  //---Course
  const handleCourse = (course: Course) => {
    setCourse((prev) => [...prev, course]);
  };
  const removeCourse = (selectedCourse: Course) => {
    setCourse((prev) => prev.filter((course) => course.title !== selectedCourse.title));
  };
  //---Course

  //---Extra Info
  const handleExtraInfo = (html: HTML) => {
    setExtraInfo(html);
  };
  //---Extra Info

  const handleAddProduct = () => {
    const product: Product = {
      id: dbId,
      productId,
      option: "update",
      category,
      title: productTitle,
      startPrice: 9999,
      admin: "daw916@naver.com",
      updateAdmin: "daw916@naver.com",
      location: {
        country,
        city,
      },
      accessAuthority: {
        accessibleUserList,
        accessibleTier,
      },
      duration: `${durationNights}박 ${durationDays}일`,
      startDate: listingStartDate,
      endDate: listingEndDate,
      mainImg,
      ticket,
      mainInfo,
      course,
      extraInfo,
    };
    console.log(product);
    const jsonString = JSON.stringify(product);
    const byteSize = new Blob([jsonString], { type: "application/json" }).size;
    console.log("byteSize: ", byteSize);

    axiosInstance
      .post("/test/api/product/insert", product)
      .then((res) => {
        console.log(JSON.stringify(res));
        alert(`
      여행 상품 등록에 성공했습니다.
      ${JSON.stringify(res)}
    `);
      })
      .catch((err) => {
        console.error(err);
        alert(`
      여행 상품 등록에 실패했습니다.
      ${err}
    `);
      });
  };

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
              {category.map((categoryName) => (
                <li key={categoryName}>
                  <span>{categoryName}</span>
                  <button className={styles.removeBtn} onClick={() => handleDeleteCategory(categoryName)}>
                    <IoMdRemoveCircle />
                  </button>
                </li>
              ))}
            </div>
          </div>
          <div className={styles.code}>
            <span className={styles.title}>상품 코드</span>
            <input className={styles.productId} type="text" value={productId} readOnly />
          </div>
        </div>
      </section>

      {isConcierge && (
        <section>
          <div className={styles.sectionTitle}>접근 권한 설정</div>
          <div className={styles.sectionDivider}></div>
          <div className={`${styles.container} ${styles.accessAuthority}`}>
            <div className={`${styles.controller} ${styles.accessAuthority}`}>
              <div className={styles.accessibleUser}>
                <span className={styles.title}>접근 가능 회원 ID</span>
                <input
                  className={styles.accessibleUserInput}
                  value={accessibleUser}
                  onChange={handleAccessibleUser}
                  type="text"
                />
                <button className={styles.addBtn} onClick={handleAddAccessibleUser}>
                  추가
                </button>
              </div>
              <div className={styles.accessibleTier}>
                <span className={styles.title}>등급 설정</span>
                <select value={accessibleTier} onChange={handleAccessibleUserTier}>
                  <option value="">등급 선택</option>
                  {renderUserTierOptions()}
                </select>
              </div>
            </div>
            {accessibleUserList && (
              <div className={styles.accessibleUserList}>
                <ul>
                  {accessibleUserList.map((user) => (
                    <li>{user}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      <section>
        <div className={styles.sectionTitle}>기본 사항</div>
        <div className={styles.sectionDivider}></div>
        <div className={`${styles.container} ${styles.name}`}>
          <span className={` ${styles.title} ${styles.name}`}>여행 상품명</span>
          <input className={`${styles.nameInput}`} value={productTitle} onChange={handleProductName} type="text" />
        </div>
        <div className={`${styles.container} ${styles.locationAndDuration}`}>
          <div className={styles.country}>
            <span className={styles.title}>국가</span>
            <input value={country} onChange={handleCountry} type="text" />
          </div>
          <div className={styles.city}>
            <span className={styles.title}>도시</span>
            <input value={city} onChange={handleCity} type="text" />
          </div>
          <div className={styles.productPeriod}>
            <span className={styles.title}>상품 게재 기간</span>
            <input value={listingStartDate} onChange={handleListingStartDate} type="date" />
            <span> ~ </span>
            <input value={listingEndDate} onChange={handleListingEndDate} type="date" />
          </div>
          <div className={styles.duration}>
            <span className={styles.title}>여행 기간</span>
            <input
              className={styles.duration_input}
              value={durationNights}
              onChange={handleDurationNights}
              type="text"
              placeholder=""
              maxLength={2}
            />
            <span className={styles.title}>박</span>
            <input
              className={styles.duration_input}
              value={durationDays}
              onChange={handleDurationDays}
              type="text"
              placeholder=""
              maxLength={2}
            />
            <span className={styles.title}>일</span>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sectionTitle}>메인 이미지</div>
        <div className={styles.sectionDivider}></div>
        <MainImage option={"edit"} mainImgProp={mainImg} onAdd={handleMainImg} onRemove={removeMainImg} />
      </section>
      <section>
        <div className={styles.sectionTitle}>티켓</div>
        <div className={styles.sectionDivider}></div>
        <TicketInfo ticketProps={ticket} onAdd={handleTicket} onRemove={removeTicket} />
      </section>
      <section>
        <div className={styles.sectionTitle}>상품 소개</div>
        <div className={styles.sectionDivider}></div>
        <MainInfo htmlProps={mainInfo} onChange={handleMainInfo} />
      </section>
      <section>
        <div className={styles.sectionTitle}>여행 코스</div>
        <div className={styles.sectionDivider}></div>
        <CourseInfo option={"edit"} courseProps={course} onAdd={handleCourse} onRemove={removeCourse} />
      </section>
      <section>
        <div className={styles.sectionTitle}>추가 정보</div>
        <div className={styles.sectionDivider}></div>
        <ExtraInfo htmlProps={extraInfo} onChange={handleExtraInfo} />
      </section>
      <section>
        <div className={styles.sectionTitle}>담당 가이드</div>
        <div className={styles.sectionDivider}></div>
        <div className={`${styles.container} ${styles.guide}`}>
          <div className={styles.guideProfile}>
            <div className={styles.guideImg}></div>
            <p className={styles.guideName}>name</p>
            <p className={styles.guideCode}>1234-1234-1234</p>
          </div>
          <div className={styles.divider}></div>
          <textarea className={styles.guideTextArea} placeholder="내용을 입력하세요."></textarea>
          <button className={styles.guideGetBtn}>가이드 불러오기</button>
        </div>
      </section>
      <div className={`${styles.container} ${styles.submit}`}>
        <button className={styles.submitBtn} onClick={handleAddProduct}>
          상품 수정하기
        </button>
      </div>
    </div>
  );
}

export default ProductEdit;
