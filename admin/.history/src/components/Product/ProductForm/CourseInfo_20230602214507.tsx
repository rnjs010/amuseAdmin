import styles from './CourseInfo.module.css';
import CourseModal from '../../Modal/CourseModal';
import { useEffect, useState } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';

interface ImageFile {
  fileName: string,
  base64Data: string
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
  onAdd(course: Course): void,
  onRemove(course: Course): void,
  courseProps: Course[]
}


function CourseInfo({courseProps, onAdd, onRemove} : MainInfoProps) {
  const [courseModalOpen, setCourseModalOpen] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(()=>{
    setCourseList(courseProps);
  },[courseProps])

  const toggleCourseModal = () => {
    setCourseModalOpen((prev) => !prev);
  }
  const handleCourseModal = (course:Course) => {
    toggleCourseModal();
    setCourseList((prev) => [...prev, course]);
    onAdd(course);
  }
  const removeCourse = (selectedCourse:Course) => {
    setCourseList((prevCourses) => prevCourses.filter((course) => course.title !== selectedCourse.title));
    onRemove(selectedCourse);
  }

  const renderCourseList = () => {
    return (
      <ul>
        {courseList.map((course) => {
          return (
            <li className={styles.courseBox} key={course.title}>
              <button className={styles.removeBtn} onClick={() => removeCourse(course)}><IoMdRemoveCircle/></button>
              <div className={styles.textInfo}>
                <p>제목: {course.title}</p>
                <p>소요시간: {course.timeCost}</p>
                <p>설명: {course.content}</p>
              </div>
              <img className={styles.courseImg} src={course.image.base64Data} alt="Course" />
            </li>
          )
        })}
      </ul>
    )
  };

  
  return (
  <div className={`${styles.container} ${styles.course}`}>
      <div>
        <span className={styles.title}>코스 관리</span>
        <button className={styles.addBtn} onClick={toggleCourseModal}>추가하기</button>
        {courseModalOpen && <CourseModal onSave={handleCourseModal} onToggle={toggleCourseModal}/>}
      </div>
      <div className={`${styles.status} ${styles.course}`}>
        {renderCourseList()}
      </div>
  </div>
  );
}

export default CourseInfo;