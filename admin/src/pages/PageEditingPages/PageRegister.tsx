import React, { useEffect, useRef, useState } from "react";

import styles from "../../components/PageEditing/page.module.css";

import { useParams } from "react-router-dom";
import { PageLogic } from "../../logics/PageLogic";
import { ComponentLogic } from "../../logics/ComponentLogic";
import Table from "../../components/Table/Table";
import { PageTableColumns } from "../../components/Table/PageTableColumns";

interface PageCompList {
  sequence: number;
  id: number;
}

const PageRegister = () => {
  const [name, setName] = useState<string>("");
  const [sequence, setSequence] = useState<number>(0);
  const [isDisplay, setIsDisplay] = useState<string>("활성화");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImageFileName, setCategoryImageFileName] = useState("");

  const categoryImageRef = useRef<HTMLInputElement | null>(null);
  const [mainDescription, setMainDescription] = useState<string>("");
  const [subDescription, setSubDescription] = useState<string>("");

  const [pageComponentListArr, setPageComponentListArr] = useState<PageCompList[]>([]);
  const [componentListArr, setComponentListArr] = useState<any>([]);

  const [pageListArr, setPageListArr] = useState<any>([]);

  const radioComponentTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisplay(event.target.value);
  };

  const validationCheck = () => {
    if (!name) {
      window.confirm("페이지 명을 입력하세요");
      return false;
    }

    // if (!categoryImageFileName) {
    //   window.confirm("이미지를 첨부하세요 (filename)");
    //   return false;
    // }
    if (!categoryImage) {
      window.confirm("이미지를 첨부하세요 (categoryImage)");
      return false;
    }

    if (isDisplay === "활성화" && sequence < 0) {
      window.confirm("배치순서를 확인하세요");
      return false;
    }

    if (!mainDescription || !subDescription) {
      window.confirm("설명 입력을 다시 확인해주세요");
      return false;
    }

    // if (pageComponentListArr.length === 0) {
    // 	window.confirm("추가할 컴포넌트를 선택해주세요");
    // 	return false;
    // }

    return true;
  };

  const submitPage = async () => {
    if (!validationCheck()) return;
    console.log(
      "ddddd",
      pageComponentListArr?.map((v: any) => ({ componentId: v.id, sequence: v.sequence }))
    );
    const response = await PageLogic.registerPage({
      name: name,
      fileName: categoryImageFileName,
      base64Data: categoryImage,
      sequence: sequence,
      disable: isDisplay === "활성화" ? false : true,
      mainDescription: mainDescription,
      subDescription: subDescription,
      pageComponentInfos: pageComponentListArr?.map((v: any) => ({ componentId: v.id, sequence: v.sequence })),
    })
      .then(() => {
        window.confirm("등록되었습니다.");
        window.history.back();
      })
      .catch((e) => window.confirm(e));
  };

  useEffect(() => {
    (async () => {
      const response = await PageLogic.getPageListNotDisable();
      setPageListArr(response);
      setPageComponentListArr([])
    })();

    (async () => {
      const response = await ComponentLogic.getComponentList();
      setComponentListArr(response);
    })();
  }, []);

  const saveImgFile = () => {
    if (categoryImageRef != null) {
      // @ts-ignore
      const file = categoryImageRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // @ts-ignore
        setCategoryImage(reader.result);
        setCategoryImageFileName(file.name);
      };
    }
  };

  const componentListHandler = (component: any) => {
    console.log("dfdf")
    if (!pageComponentListArr) return;
    if (!pageComponentListArr.some((v: any) => v.id === component.id)) {
      setPageComponentListArr([...pageComponentListArr, component]);
      return;
    }

    setPageComponentListArr(pageComponentListArr.filter((v: any) => v.id !== component.id));
    return;
  };
  useEffect(()=>{
    console.log(pageComponentListArr)
  },[pageComponentListArr])
  // @ts-ignore
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>페이지</strong>
          </div>

          <input
            className={styles.textInput}
            type="text"
            name="pageName"
            value={name}
            placeholder="페이지 이름을 입력하세요"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>페이지 목록</strong>
          </div>
          <Table route={"page"} columns={PageTableColumns} data={pageListArr} />
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>배치 순서</strong>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <input
              className={styles.textInput}
              type="number"
              name="sequence"
              value={sequence}
              placeholder="배치 순서를 입력하세요"
            />

            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                border: "1px solid",
              }}
              onClick={() => setSequence(sequence + 1)}
            >
              <div>+</div>
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                border: "1px solid",
              }}
              onClick={() => setSequence(sequence - 1)}
            >
              <div>-</div>
            </button>
          </div>
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong> 카테고리 활성화 </strong>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10 }}>
              <input
                type="radio"
                checked={isDisplay === "활성화"}
                value={"활성화"}
                id={"active"}
                onChange={radioComponentTypeHandler}
              />
              <div> 활성화</div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10 }}>
              <input
                type="radio"
                checked={isDisplay === "비활성화"}
                value={"비활성화"}
                id={"Inactive"}
                onChange={radioComponentTypeHandler}
              />
              <div> 비활성화</div>
            </div>
          </div>
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>대표 이미지</strong>
          </div>
          <input type="file" accept="image/*" id="categoryImage" onChange={saveImgFile} ref={categoryImageRef} />
        </div>

        <div className={styles.p}>
          {!categoryImage ? "" : <img src={categoryImage} width={200} alt="categoryImage" />}
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>대표 설명</strong>
          </div>
          <div>
            <textarea
              style={{
                border: "1px solid",
              }}
              value={mainDescription}
              onChange={(e) => setMainDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>부가 설명</strong>
          </div>
          <div>
            <textarea
              style={{
                border: "1px solid",
              }}
              value={subDescription}
              onChange={(e) => setSubDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>등록된 컴포넌트</strong>
          </div>

          {pageComponentListArr?.map((v: any, i: any) => (
            <div key={i} className={styles.componentListCell}>
              <div style={{ marginLeft: 10, width: 150 }}> id: {v.id} </div>
              <div style={{ marginLeft: 10, width: 300 }}> title: {v.title} </div>
              <div style={{ marginLeft: 10, width: 150 }}> type: {v.type} </div>
            </div>
          ))}
        </div>

        <div className={styles.p}>
          <div className={styles.pTitle}>
            <strong>컴포넌트 목록</strong>
          </div>
          {componentListArr.map((v: any, i: any) => (
            <div key={i} className={styles.componentListCell}>
              <input
                type={"checkbox"}
                onChange={(e) => componentListHandler(v)}
                checked={pageComponentListArr?.some((value: any) => value.id === v.id)}
              />
              <div style={{ marginLeft: 10, width: 150 }}> id: {v.id} </div>
              <div style={{ marginLeft: 10, width: 300 }}> title: {v.title} </div>
              <div style={{ marginLeft: 10, width: 150 }}> type: {v.type} </div>
            </div>
          ))}
        </div>
        <div className={styles.p}>
          <button className={styles.button} onClick={submitPage}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
