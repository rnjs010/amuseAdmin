import React, { useRef, useState } from "react";
import styles from "../../components/Notice/NoticeRegister.module.css";
import ToastEditor from "../../components/ToastEditor";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";

const NoticeRegister = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<Editor>(null);

  const registerNotice = () => {
    (async () => {
      await axios
        .post("https://devapi.wheelgo.net/test/api/notice/register", {
          title: title,
          content: content,
          createdBy: "daw916@naver.com",
        })
        .then(() => {
          window.confirm("등록되었습니다.");
          window.history.back();
        })
        .catch((e) => window.confirm(e));
    })();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <p className={styles.p}>
            <div className={styles.pTitle}>
              <strong>제목</strong>
            </div>
            <input
              className={styles.textInput}
              type="text"
              name="categoryName"
              placeholder="공지사항 제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>

          <p className={styles.p}>
            <div className={styles.pTitle}>
              <strong> 공지사항 내용 </strong>
            </div>

            <div>
              <Editor
                ref={contentRef}
                placeholder="내용을 입력하세요"
                previewStyle="tab"
                initialEditType="markdown"
                hideModeSwitch={true}
                height="500px"
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                ]}
                customHTMLRenderer={{
                  // 구글 맵 삽입을 위한
                  // iframe 태그 커스텀 코드
                  htmlBlock: {
                    iframe(node: any) {
                      return [
                        {
                          type: "openTag",
                          tagName: "iframe",
                          outerNewLine: true,
                          attributes: node.attrs,
                        },
                        { type: "html", content: node.childrenHTML },
                        { type: "closeTag", tagName: "iframe", outerNewLine: true },
                      ];
                    },
                  },
                }}
                onChange={() => {
                  try {
                    // @ts-ignore
                    setContent(contentRef.current?.getInstance().getHTML());
                  } catch (error) {
                    console.log(error);
                  }
                }}
                hooks={{
                  addImageBlobHook: async (blob, callback) => {
                    console.log(blob);
                  },
                }}
              ></Editor>
            </div>
          </p>

          <div className={styles.p}>
            <button className={styles.button} onClick={registerNotice}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRegister;
