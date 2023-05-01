import { useEffect, useState } from 'react';
import styles from './TicketModal.module.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

type MordalProps = {
  onSave(): void
};

function ContentModal({onSave}: MordalProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");

  const handleSave = () => {
    onSave();
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>상품 소개 관리</header>
        <div className={styles.body}>
          <Editor
          />
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
      <div className={styles.backDrop}></div>
    </>
  );
}

export default ContentModal;