import styles from './CourseInfo.module.css';
import CourseModal from '../../Modal/CourseModal';
import { useState } from 'react';

interface ImageFile {
  fileName: string,
  base64Data: string
}

interface Course {
  title: string;
  timeCost: string;
  content: string;
  image: ImageFile;
}

interface MainInfoProps {
  onAdd(course: Course): void,
}


function CourseInfo({onAdd} : MainInfoProps) {
  const [courseModalOpen, setCourseModalOpen] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const toggleCourseModal = () => {
    setCourseModalOpen((prev) => !prev);
  }
  const handleCourseModal = (course:Course) => {
    toggleCourseModal();
    setCourseList((prev) => [...prev, course])
  }

  const renderCourseList = () => {
    return (
      <ul>
        {courseList.map((course) => {
          return (
            <li className={styles.courseBox} key={course.title}>
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