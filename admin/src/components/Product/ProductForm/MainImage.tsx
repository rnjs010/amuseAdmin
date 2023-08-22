import { useEffect, useState } from 'react';
import styles from './MainImage.module.css';
import {IoMdRemoveCircle} from 'react-icons/io';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface ImageFile {
  fileName: string,
  base64Data: string,
  imgUrl: string | undefined
}

interface ExtraInfoProps {
  handleMainImgSet(image: ImageFile[]): void,
  onAdd(image: ImageFile[]): void,
  onRemove(image: ImageFile): void,
  mainImgProp: ImageFile[]
  option: string
}

function MainImage({option, mainImgProp,handleMainImgSet, onAdd, onRemove}:ExtraInfoProps) {
  useEffect(() => {
    setMainImg(mainImgProp);
  }, [mainImgProp])

  const [mainImg, setMainImg] = useState <ImageFile[]>([]);
  
  const handleMainImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files as FileList);
    const filePromise: Promise <ImageFile>[] = [];

    for (const file of files) {
      filePromise.push(
        new Promise <ImageFile>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({fileName: file.name, base64Data: reader.result as string, imgUrl: ''});
          };
          reader.readAsDataURL(file);
        })
      );
    }

    Promise.all(filePromise).then((base64Files) => {
      setMainImg((prev) => [...prev, ...base64Files]);
      onAdd(base64Files)
    })
  }

  const removeMainImg = (file: ImageFile) => {  
    if(option === "create"){
      setMainImg((prevImages) => prevImages.filter((img) => img.fileName !== file.fileName));
    }
    else if(option === "edit"){
      console.log('🔥', file.imgUrl);
      setMainImg((prevImages) => prevImages.filter((img) => img.imgUrl !== file.imgUrl));
    }
    onRemove(file);
  }

  const renderImageList = () => {
    return(
      <ul className={styles.mainImgList}>
         {mainImg.map((file,index) => {
                return (
                  <div className={styles.renderedImg} key={file.imgUrl?.toString() + index.toString() || file.base64Data.toString() + index.toString()}>
                    <img 
                      key={file.fileName}
                      src={file.imgUrl || file.base64Data}
                      alt={file.fileName}
                      className={styles.img}                  
                    />
                    <button className={styles.removeBtn} onClick={() => removeMainImg(file)}><IoMdRemoveCircle/></button>
                  </div>                
                )
              })}
      </ul>
    )
  }
  
  const handleItemReorder = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const dragIndex = source.index;
    const hoverIndex = destination.index;

    let reorderedItems = [...mainImg];
    const draggedItem = reorderedItems[dragIndex];

    // 순서 변경
    reorderedItems.splice(dragIndex, 1);
    reorderedItems.splice(hoverIndex, 0, draggedItem);

    
    reorderedItems = updateSequenceIds(reorderedItems)
    setMainImg(reorderedItems);
    handleMainImgSet(reorderedItems)
    console.log(reorderedItems)
  };
  const updateSequenceIds = (img:any) => {
    let mainImages =img
    for (let index = 0; index < mainImages.length; index++) {
        mainImages[index].sequence = index + 1;
    }
    return mainImages
  }

  return (
    <div className={`${styles.container} ${styles.mainImg}`} style={{justifyContent:"space-between",flexDirection:"row"}}>
      <div>
      <DragDropContext onDragEnd={handleItemReorder}>
        <Droppable droppableId="component-check">
          {(provided) => (
            <div className="component-check" ref={provided.innerRef} {...provided.droppableProps}>
              {mainImg.map((file,index) => (
                <Draggable key={file.imgUrl} draggableId={`component-${file.imgUrl}`} index={index}>
                  {(provided) => (
                    <div
                      className={styles.mainImgList}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        <div className={styles.renderedImg} key={file.imgUrl?.toString() + index.toString() || file.base64Data.toString() + index.toString()}>
                          <img 
                            key={file.fileName}
                            src={file.imgUrl || file.base64Data}
                            alt={file.fileName}
                            className={styles.img}                  
                          />
                          <button className={styles.removeBtn} onClick={() => removeMainImg(file)}><IoMdRemoveCircle/></button>
                        </div>      
                      }
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
        <span className={` ${styles.title} ${styles.mainImg}`} style={{marginBottom:12}}>메인 이미지 (최대 4개 첨부가능)</span>
        <input className={styles.mainImgInput} id="mainImgInput" onChange={handleMainImg} accept="image/png, image/jpeg" multiple type="file"/>
      </div>
    </div>
  );
}

export default MainImage;