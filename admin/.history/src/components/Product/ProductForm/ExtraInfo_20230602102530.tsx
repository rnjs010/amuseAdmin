import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftjsToHtml from "draftjs-to-html";
import styles from './ExtraInfo.module.css';
import { useEffect, useState } from 'react';

type HTML = string;

interface ExtraInfoProps {
  onChange(html: HTML): void,
  htmlProps: HTML
}

function ExtraInfo({htmlProps, onChange}: ExtraInfoProps) {
  const [extraInfoState, setExtraInfoState] = useState<EditorState>(EditorState.createEmpty());

  useEffect(() => {

    const contentBlock = convertFromHTML(htmlProps);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const initialEditorState = EditorState.createWithContent(contentState);
    setExtraInfoState(initialEditorState);
  }, [htmlProps])

  const updateExtraInfoState = (extraInfoState: EditorState) => {
    setExtraInfoState(extraInfoState);
  }
  
  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(extraInfoState.getCurrentContent()));
    onChange(html)
  }, [extraInfoState]);


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
                },
                image: {
                  uploadCallback: uploadImageCallBack,
                  alt:{present: true, mandatory: false},
                  defaultSize: { height: 'auto', width: 'auto' }
                },
              }}  
            />
          </div>
    </div>
  );
}

export default ExtraInfo;