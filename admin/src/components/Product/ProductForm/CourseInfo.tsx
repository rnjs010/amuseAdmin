import _ from 'lodash';
import styles from './CourseInfo.module.css';
import CourseModal from '../../Modal/CourseModal';
import { useEffect, useState } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface ImageFile {
  fileName: string,
  base64Data: string,
  imgUrl: string | undefined,
}

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
  }
}

interface MainInfoProps {
  setCourseProps(course: Course[]):void,
  onAdd(course: Course): void,
  onRemove(course: Course): void,
  courseProps: Course[]
  option: string
}


function CourseInfo({option, courseProps,setCourseProps, onAdd, onRemove} : MainInfoProps) {
  const [courseModalOpen, setCourseModalOpen] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editCourseId, setEditCourseId] = useState<number | null>(0);

  useEffect(()=>{
    setCourseList(courseProps);
  },[courseProps])

  useEffect(() => {
    setCourseCount(courseList.length);
  }, [courseList])

  const toggleCourseModal = () => {
    setEditCourseId(null)
    setCourseModalOpen((prev) => !prev);
  }
  const handleCourseModal = (course:Course,isEdit:boolean) => {
    if(isEdit){
      console.log(course)
      let filteredData = _.filter(courseProps, item => item.id !== course.id);
      filteredData.push(course)
      filteredData = _.sortBy(filteredData,"sequenceId")
      console.log(filteredData)
      setCourseList(filteredData);
      setEditCourseId(null)
      setCourseModalOpen(!courseModalOpen)
      setIsEdit(!isEdit)
      setCourseProps(filteredData)
    }else{
      toggleCourseModal();
      setCourseList((prev) => [...prev, course]);
      setCourseCount((prev) => prev + 1);
      onAdd(course);
    }
  }
  const removeCourse = (selectedCourse:Course) => {
    setCourseList((prevCourses) => prevCourses.filter((course) => course.title !== selectedCourse.title));
    setCourseCount((prev) => prev - 1);
    onRemove(selectedCourse);
  }

  const handleItemReorder = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const dragIndex = source.index;
    const hoverIndex = destination.index;

    let reorderedItems = [...courseList];
    const draggedItem = reorderedItems[dragIndex];

    // 순서 변경
    reorderedItems.splice(dragIndex, 1);
    reorderedItems.splice(hoverIndex, 0, draggedItem);

    reorderedItems = updateSequenceIds(reorderedItems)
    setCourseList(reorderedItems);
    setCourseProps(reorderedItems)
  };
  const updateSequenceIds = (corses:any) => {
    let tourCourses =corses
    for (let index = 0; index < tourCourses.length; index++) {
        tourCourses[index].sequenceId = index + 1;
    }
    return tourCourses
  }
  const editCourse =(id:number | null)=>{
    setEditCourseId(id)
    setCourseModalOpen(true)
    setIsEdit(true)
  }
  // useEffect(()=>{
  //   console.log(editCourseId)
  // },[editCourseId])
  return (
  <div className={`${styles.container} ${styles.course}`}>
      <div>
        <span className={styles.title}>코스 관리</span>
        <button className={styles.addBtn} onClick={toggleCourseModal}>추가하기</button>
        {courseModalOpen && <CourseModal onSave={handleCourseModal} onToggle={toggleCourseModal} courseCount={courseCount} isEdit={isEdit} editCourseId={editCourseId} courseProps={courseProps}/>}
      </div>
      <div className={`${styles.status} ${styles.course}`} style={{overflow:"auto"}}>
        <DragDropContext onDragEnd={handleItemReorder}>
              <Droppable droppableId="component-check">
                {(provided) => (
                  <div className="component-check" ref={provided.innerRef} {...provided.droppableProps}>
                    {courseList.map((course, index) => (
                      <Draggable key={course.id} draggableId={`component-${course.title}`} index={index}>
                        {(provided) =>(
                          <div
                            className="component-check"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {
                              <div className={styles.courseBox}>               
                                <button className={styles.removeBtn} onClick={() => removeCourse(course)}><IoMdRemoveCircle/></button>
                                <div className={styles.textInfo}>
                                  <p style={{marginBottom:32}}>{course.day}{"일차"}</p>
                                  <p>제목</p>
                                  <span>{course.title}</span>
                                  <p>소요시간</p>
                                  <span>{course.timeCost}</span>
                                  <p>설명</p>
                                  <span style={{whiteSpace:"pre-wrap"}}>{course.content}</span>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                  <img className={styles.courseImg} src={course.image.imgUrl ? course.image.imgUrl: course.image.base64Data} alt="Course" />
                                  <button className={styles.addBtn} style={{marginTop:12,cursor:"pointer"}} onClick={()=>{
                                    editCourse(course.id)
                                  }}>수정</button>
                                </div>
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
        {/* {renderCourseList()} */}
      </div>
  </div>
  );
}



export default CourseInfo;