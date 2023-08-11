import React from "react";
import styled from "styled-components";

const Paging = ({max = 0,num,width="100%",minWidth,setNum}) =>{
    let pageView =[]
    for(let  i =0; i < max ; i++){
        pageView[i] = {page: i+1}
    }

    
    
    const clicker =(value) =>{
        setNum(value)
    }


    if(max>0){
        return(
            <div style={{width:width,minWidth:minWidth,display:"flex",flexDirection:"column"}}>
                <PrView>
                <ButtonStyle style={{cursor:"pointer"}} onClick={()=>{
                    if(num>1){
                        clicker(num-1)
                    }
                }}>{"이전"}</ButtonStyle>
                {
                    pageView.map((item,index)=>{
                        if(max>4){
                            if(num === 1){
                                let numColor = "#000"
                                let weight = "bold"
                                if(num === item.page){
                                    numColor = "#eb3e6c"
                                    weight = "bold"
                                }
                                if(index < 3){
                                    
                                    return(
                                        <ButtonStyle key={index} style={{color:numColor,fontWeight: weight,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                    )
                                }else if(index === max-1){
                                    return(
                                        <PrView key={index}>
                                            <ButtonStyle style={{color:numColor,fontWeight: weight}} >...</ButtonStyle>
                                            <ButtonStyle style={{color:numColor,fontWeight: weight,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                        </PrView>
                                    )
                                }
                            }else if(num === max){
                                let numColor = "#000"
                                let weight = "bold"
                                if(num === item.page){
                                    numColor = "#eb3e6c"
                                    weight = "bold"
                                }
                                if(item.page > max-3){
                                    
                                    return(
                                        <ButtonStyle key={index} style={{color:numColor,fontWeight: weight ,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                    )
                                }else if(item.page === max){
                                    return(
                                        
                                        <ButtonStyle key={index} style={{color:numColor,fontWeight: weight ,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                    )
                                }else if(item.page === 1){
                                    return(
                                        <PrView key={index}>
                                            <ButtonStyle style={{color:numColor,fontWeight: weight ,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                            <ButtonStyle style={{color:numColor,fontWeight: weight}} >...</ButtonStyle>
                                        </PrView>
                                    )
                                }
                            }else{
                                let numColor = "#000"
                                let weight = "bold"
                                if(num === item.page){
                                    numColor = "#eb3e6c"
                                    weight = "bold"
                                }
                                
                                if(num -2 < item.page && num + 2 > item.page){
                                    return(
                                        <ButtonStyle key={index} style={{color:numColor,fontWeight: weight ,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                    )
                                }
                                else if(item.page === 1 ){
                                    let dots; 
                                    if(num > 3){
                                        dots=(<ButtonStyle style={{color:numColor,fontWeight: weight,backgroundColor:"#fff"}} >...</ButtonStyle>)
                                    }
                                    return(
                                        <PrView key={index}>
                                            <ButtonStyle style={{color:numColor,fontWeight: weight,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                            {dots}
                                        </PrView>
                                    )
                                }
                                else if(item.page == max ){
                                    let dots; 
                                    if(num < max-2){
                                        dots=(<ButtonStyle style={{color:numColor,fontWeight: weight, backgroundColor:"#fff"}} >...</ButtonStyle>)
                                    }
                                    return(
                                        <PrView key={index}>
                                            {dots}
                                            <ButtonStyle style={{color:numColor,fontWeight: weight,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                        </PrView>
                                    )
                                }
                            }
                        }else{
                                let numColor = "#000"
                                let weight = "bold"
                                if(num === item.page){
                                    numColor = "#eb3e6c"
                                    weight = "bold"
                                }
                                return(
                                    <ButtonStyle key={index} style={{color:numColor,fontWeight: weight ,cursor:"pointer"}} onClick={()=>{clicker(item.page)}}>{item.page}</ButtonStyle>
                                )
                        }

                    })          
                }
                <ButtonStyle style={{cursor:"pointer"}} onClick={()=>{
                    if(num < max){
                        clicker(num+1)
                    }
                }}>{"다음"}</ButtonStyle>
                </PrView>
                
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}
export default Paging

const ButtonStyle = styled.div`
    margin-left:5px;
    margin-right:5px;
    min-width : 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    height : 20px;
    font-size: 13px;
    font-weight:bold;

    &:hover{
        color: #eb3e6c;
    }

`
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;