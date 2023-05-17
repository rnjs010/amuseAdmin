import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftjsToHtml from "draftjs-to-html";
import { useEffect, useState } from 'react';
import styles from './MainInfo.module.css';

type HTML = string;

interface MainInfoProps {
  onChange(html: HTML): void,
}


function MainInfo({onChange}: MainInfoProps) {
  const [mainInfoState, setMainInfoState] = useState<EditorState>(EditorState.createEmpty());

  const updateMainInfoState = (mainInfoState: EditorState) => {
    setMainInfoState(mainInfoState);
  }

  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(mainInfoState.getCurrentContent()));
    onChange(html);
  }, [mainInfoState]);

  const uploadImageCallBack = (file: File) => {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const src = reader.result;
          resolve({data: {link:src}});
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.readAsDataURL(file);
      }
    );
  };


  return (
    <div className={`${styles.container} ${styles.mainInfo}`}>
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
            padding: "10px",
            lineHeight: "8px"
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
              alt:{present: true, mandatory: false},
              defaultSize: { height: 'auto', width: 'auto' }
            },
          }
        }        
        />
      </div>
    </div>
  );
}

export default MainInfo;