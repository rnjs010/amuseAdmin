import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import axiosInstance,{axiosTokenRefresh} from "../../../services/axiosInstance";
import { useEffect, useState } from "react";
import styles from "../ProductForm/ProductForm.module.css";
import MainImage from "../ProductForm/MainImage";
import TicketInfo from "../ProductForm/TicketInfo";
import MainInfo from "../ProductForm/MainInfo";
import CourseInfo from "../ProductForm/CourseInfo";
import ExtraInfo from "../ProductForm/ExtraInfo";
import { IoMdRemoveCircle } from "react-icons/io";
import { Cookies, useCookies } from "react-cookie";
import ModalComponent from "../ProductForm/ModalComponent";
import FindMinWeekdayPrice from "../FindMinWeekdayPrice";

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
  sequence: number;
  fileName: string;
  base64Data: string;
  imgUrl: string | undefined;
}

type Product = {
  id: number;
  productId: string;
  option: string;
  category: string[];
  title: string;
  startPrice: number;
  admin: string;
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
  guide_code: string;
  guide_comment: string;
};

const userTierList = ["Bronze", "Silver", "Gold", "Platinum"];

function ProductEdit() {
  const params = useParams();
  const navigate = useNavigate();
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

  const [guideSelected, setGuideSelected] = useState<GuideData>();
  const [guide_code, setGuideCode] = useState<HTML>("");
  const [guide_comment, setGuideComment] = useState<HTML>("");
  const [guideInfos, setGuideInfos] = useState([]); // 가이드 모달창에 불러올 정보들

  useEffect(() => {
    console.log("accessToken 값은 ", accessToken);
    const item = JSON.parse(window.sessionStorage.getItem("item") || "");

    const productDBID = item?.item_db_id;
    axiosInstance
      .get(`/test/api/product/${productDBID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
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
        if (!product.startDate) {
          setListingStartDate("");
        } else {
          setListingStartDate(product.startDate.split(" ")[0]);
        }
        if (!product.endDate) {
          setListingEndDate("");
        } else {
          setListingEndDate(product.endDate.split(" ")[0]);
        }
        setMainImg(product.mainImg);
        setTicket(product.ticket);
        setMainInfo(product.mainInfo);
        setCourse(rearrangeBySequenceId(product.course));
        setExtraInfo(product.extraInfo);
        setGuideCode(product.guide_code);
        setGuideComment(product.guide_comment);
      });
  }, []);

  const rearrangeBySequenceId = (touristSpots: Course[]): Course[] => {
    return [...touristSpots].sort((a, b) => a.sequenceId - b.sequenceId);
  }
  const rearrangeBySequence = (images: ImageFile[]): ImageFile[] => {
    return [...images].sort((a, b) => a.sequence - b.sequence);
  }

  useEffect(() => {
    loadGuide(false);
  }, [guide_code]);

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
    setIsConcierge(false);
    for(let item of category){
      if(item.includes("컨시어지")){
        setIsConcierge(true);
      }
    }
  }, [category]);

  const handleDeleteCategory = (clickedCategory: string) => {
    setCategory(category.filter((category) => category !== clickedCategory));
  };

  const handleDeleteConcierge = (clickedUser: string) => {
    setAccessibleUserList(accessibleUserList.filter((category) => category !== clickedUser));
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

  const handleMainImgSet = (imageFiles: ImageFile[]) => {
    setMainImg(imageFiles);
  };
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
  const setCourseProps =(course: Course[])=>{
    setCourse(course);  
  }
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

  type GuideData = {
    guide_db_id: number;
    guideCode: string;
    userName: string;
    email: string;
    profileImageUrl: string;
    introduce: string;
  };

  // Now use the custom type for guideSelected state

  const handleGuideComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGuideComment(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부를 관리하는 상태

  const loadGuide = async (tof: boolean) => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_AMUSE_API}/test/api/list/guide?page=1&limit=4`);
      const guideInfoData = response.data.data.guideInfo;
      console.log(response.data.data.guideInfo);
      setGuideInfos(guideInfoData);
      setIsModalOpen(tof); // 가이드 정보를 불러오는 버튼을 누르면 모달을 엽니다.
      if (!tof) {
        const guide = _.find(guideInfoData, { guideCode: guide_code });
        if (guide) {
          handleGuideCodeSelect(guide);
        }
      }
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };
  const handleGuideCodeSelect = (selectedGuide: GuideData) => {
    setGuideSelected(selectedGuide);
    setGuideCode(selectedGuide.guideCode);
    console.log("가이드값", selectedGuide);
  };

  // console.log("가이드 코드 ", guide_code);

  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫습니다.
  };
  const checkInsert =()=>{
    if(!productId){
      alert("상품코드를 입력해주세요")
      document.getElementById("product-code")?.focus()
      return false
    }
    if(!productTitle){
      alert("상품명을 입력해주세요")
      document.getElementById("product-name")?.focus()
      return false
    }
    if(!country){
      alert("국가 정보를 입력해주세요")
      document.getElementById("country-name")?.focus()
      return false
    }
    if(!city){
      alert("도시 정보를 입력해주세요")
      document.getElementById("city-name")?.focus()
      return false
    }
    if(ticket.length < 0){
      alert("티켓을 등록해주세요")
      return false
    }
    if(!durationNights || !durationDays){
      alert("여행기간을 입력해주세요")
      document.getElementById("duration-name")?.focus()
      return false
    }
    if(isConcierge && !accessibleTier){
      alert("등급을 설정해주세요")
      document.getElementById("product-rank")?.focus()
      return false
    }
    if(!guideSelected){
      alert("가이드를 선택해주세요.");
      document.getElementById("guide-code")?.focus()
      return false
    }
    return true
  }
  const handleEditProduct = async() => {
    if(checkInsert()){
      try {
        // checkAdminAccounts(cookies.id);
        console.log("productform 현재 토큰:", cookies.id);
        const item = JSON.parse(window.sessionStorage.getItem("item") || "");
        const product: Product = {
          id: item.item_db_id,
          productId,
          option: "update",
          category,
          title: productTitle,
          startPrice: FindMinWeekdayPrice(ticket),
          admin: "daw916@naver.com",
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
          endDate: listingEndDate || "",
          mainImg,
          ticket,
          mainInfo,
          course,
          extraInfo,
          guide_code: guideSelected!.guideCode,
          guide_comment,
        };

        // console.log(product); // mainImg, course 배열 순서대로 아이템 배치 필요
        // console.log(product)
        const jsonString = JSON.stringify(product);
        const byteSize = new Blob([jsonString], { type: "application/json" }).size;
        await axiosTokenRefresh(cookies.id)
        const res = axiosInstance
          .post("/test/api/product/insert", product, {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.id,
            },
          })
          .then((response) => {
            // console.log(JSON.stringify(response));
            alert(`
            여행 상품 등록에 성공했습니다.
          `);
            navigate("/status");
          })
          .catch((err) => {
            console.error(err);
            alert(`
            여행 상품 등록에 실패했습니다.
            ${err}
          `);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.productForm}>
      <section>
        <div className={styles.sectionTitle}>상품 분류</div>
        <div className={styles.sectionDivider}></div>
        <div
          className={`${styles.container} ${styles.idAndCategory}`}
          style={{ flexDirection: "column", alignItems: "flex-start" }}
        >
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
          <div className={styles.code} style={{ marginTop: 24 }}>
            <span className={styles.title}>상품 코드</span>
            <input id="product-code" tabIndex={-1} className={styles.productId} type="text" value={productId} readOnly />
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
                <select id='product-rank' tabIndex={-1} value={accessibleTier} onChange={handleAccessibleUserTier}>
                  <option value="">등급 선택</option>
                  {renderUserTierOptions()}
                </select>
              </div>
            </div>
            {accessibleUserList && (
              <div className={styles.accessibleUserList}>
                {/* <ul>
                  {accessibleUserList.map((user) => (
                    <li>{user}</li>
                  ))}
                </ul> */}
                <div className={styles.categoryStatus}>
                  {accessibleUserList.map((user) => (
                    <li key={user}>
                      <span>{user}</span>
                      <button className={styles.removeBtn} onClick={() => handleDeleteConcierge(user)}>
                        <IoMdRemoveCircle />
                      </button>
                    </li>
                  ))}
                </div>
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
          <input id="product-name" tabIndex={-1} className={`${styles.nameInput}`} value={productTitle} onChange={handleProductName} type="text" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={`${styles.container} ${styles.locationAndDuration}`} style={{ justifyContent: "flex-start" }}>
            <div className={styles.country}>
              <span className={styles.title}>국가</span>
              <input id='country-name' tabIndex={-1} value={country} onChange={handleCountry} type="text" />
            </div>
            <div className={styles.city} style={{ marginLeft: 12 }}>
              <span className={styles.title}>도시</span>
              <input  id='city-name' tabIndex={-1} value={city} onChange={handleCity} type="text" />
            </div>
          </div>
          <div className={`${styles.container} ${styles.locationAndDuration}`}>
            <div className={styles.productPeriod}>
              <span className={styles.title}>상품 게재 기간</span>
              <input value={listingStartDate} onChange={handleListingStartDate} type="date" />
              <span style={{ margin: "0 12px" }}> ~ </span>
              <input value={listingEndDate} onChange={handleListingEndDate} type="date" />
            </div>
            <div id='duration-date' tabIndex={-1} className={styles.duration}>
              <span className={styles.title}>여행 기간</span>
              <input
                className={styles.duration_input}
                value={durationNights}
                onChange={handleDurationNights}
                type="text"
                placeholder=""
                maxLength={2}
              />
              <span className={styles.title} style={{ marginLeft: 8 }}>
                박
              </span>
              <input
                className={styles.duration_input}
                value={durationDays}
                onChange={handleDurationDays}
                type="text"
                placeholder=""
                maxLength={2}
              />
              <span className={styles.title} style={{ marginLeft: 8 }}>
                일
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sectionTitle}>메인 이미지</div>
        <div className={styles.sectionDivider}></div>
        <MainImage option={"edit"} mainImgProp={mainImg} handleMainImgSet={handleMainImgSet} onAdd={handleMainImg} onRemove={removeMainImg} />
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
        <CourseInfo option={"edit"} courseProps={course} setCourseProps={setCourseProps} onAdd={handleCourse} onRemove={removeCourse} />
      </section>
      <section>
        <div className={styles.sectionTitle}>추가 정보</div>
        <div className={styles.sectionDivider}></div>
        <ExtraInfo htmlProps={extraInfo} onChange={handleExtraInfo} />
      </section>
      <section>
        <div className={styles.sectionTitle}>담당 가이드</div>
        <div className={styles.sectionDivider}></div>
        <div id="guide-code" tabIndex={-1} className={`${styles.container} ${styles.guide}`}>
          <div className={styles.guideProfile}>
            {guideSelected && guideSelected.profileImageUrl && (
              <>
                <img src={guideSelected.profileImageUrl} alt="Guide Profile" className={styles.guideImg} />
                <p className={styles.guideName}>{guideSelected.userName}</p>
                <p className={styles.guideCode}>{guideSelected.email}</p>
              </>
            )}
          </div>
          <div className={styles.divider}></div>
          <textarea
            className={styles.guideTextArea}
            placeholder="내용을 입력하세요."
            onChange={handleGuideComment}
          ></textarea>
          <button
            className={styles.guideGetBtn}
            onClick={() => {
              loadGuide(true);
            }}
          >
            가이드 불러오기
          </button>
          {isModalOpen && ( // ModalComponent를 조건부 렌더링
            <ModalComponent
              guideInfo={guideInfos}
              isOpen={isModalOpen}
              closeModal={closeModal}
              onSelectGuide={handleGuideCodeSelect}
            />
          )}
        </div>
      </section>
      <div className={`${styles.container} ${styles.submit}`}>
        <button className={styles.submitBtn} onClick={handleEditProduct}>
          상품 수정하기
        </button>
      </div>
    </div>
  );
}

export default ProductEdit;
