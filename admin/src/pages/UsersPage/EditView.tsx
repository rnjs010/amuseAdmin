import React ,{useState} from "react";
import styled from "styled-components";
import COLOR from "./color";
import axiosInstance from "../../services/axiosInstance";

interface Props {
	user: any;
    count: number;
    setCount:any;
    modalStatus:boolean
    setModalStatus:any;
}


const EditView = ({ user ,count,setCount,setModalStatus}: Props) => {
    const grades = [{rank:"Bronze"},{rank:"Silver"},{rank:"Gold"},{rank:"Platinum"}]
    const [userGrade,setUserGrade] =useState(user.grade)
	console.log((window.location))
	const onSelectGrade = (target:string)=>{
        setUserGrade(target)
    }
    const changeUserRank = async() =>{
        await axiosInstance
        .post(`/api/v1/user/${user.userDbId}/change/grade`,{grade:userGrade})
        .then((Response)=>{
            alert("변경되었습니다")
            setModalStatus(false)
            setCount(count+1)
            
        })
        .catch((err)=>{console.log("err")})
    }
	return (
        <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                <div>{`이름: ${user.name}`}</div>
                <div>{`E-mail: ${user.email}`}</div>
                <div>{`등급: `}
                <SelectRoad value={userGrade} onChange={(e)=>{onSelectGrade(e.target.value)}}>
                                
                    {
                        grades.map((item,index)=>(
                            <option key={index} value={item.rank}>{item.rank}</option>
                        ))
                    }
                </SelectRoad>
                </div>
            </div>
            <ButtonWrapper style={{marginLeft:"24px"}} onClick={()=>{changeUserRank()}}>
                등록
            </ButtonWrapper>

        </div>
	);

}
export default EditView

const SelectRoad = styled.select`
    border: 2px solid ${COLOR.LIGHT_GRAY};
    padding-left:10px;
    font-size:13px;
    width: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  align-items: center;
  font-size: 13px;
  width: 72px;
  height: 42px;
  background-color: #eb3e6c;
  margin:8px;
  color: #fff;
  curser: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #e2e2e2;
    color: #eb3e6c;
  }
`;