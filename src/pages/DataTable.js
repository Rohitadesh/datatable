import { FcSearch } from "react-icons/fc";
import { FcFilledFilter } from "react-icons/fc";
import axios from "axios";
import { useState } from "react";

// import {data } from "./components/data";
const DataTable = () =>{
    const[currentPage,setCurrentPage]=useState(1)
    const totalPerPageData=9
    const lastIndex=currentPage*totalPerPageData
    const firstIndex=lastIndex-totalPerPageData
     const data=[{
        id:1,
        name:"adesh",
        age:21,
        phonenumber:7894561236,
        gender:"M",
        Address:"Vidynagar hubli",
        pincode:59001
    },
    {
        id:2,
        name:"Ravikumar",
        age:15,
        phonenumber:7894561236,
        gender:"M",
        Address:"Vidynagar baglkot",
        pincode:59001
    },
    {
        id:3,
        name:"Shravan",
        age:21,
        phonenumber:789451230,
        gender:"M",
        Address:"jainagar banglore",
        pincode:59001
    },{
        id:4,
        name:"Bond",
        age:43,
        phonenumber:7894696356,
        gender:"M",
        Address:"MJNagarHospet",
        pincode:587456
    },
    {
        id:5,
        name:"Harry",
        age:15,
        phonenumber:7894561236,
        gender:"M",
        Address:"Vidynagar baglkot",
        pincode:59001
    },
    {
        id:6,
        name:"Jack",
        age:34,
        phonenumber:789451230,
        gender:"M",
        Address:"jainagar banglore",
        pincode:59001
    },
    {
        id:7,
        name:"Rock",
        age:54,
        phonenumber:456451230,
        gender:"M",
        Address:"jainagar banglore",
        pincode:590021
    },
    {
        id:8,
        name:"Tony",
        age:90,
        phonenumber:4561237893,
        gender:"M",
        Address:"Dargaling",
        pincode:874521
    },
    {
        id:9,
        name:"Tony",
        age:90,
        phonenumber:4561237893,
        gender:"M",
        Address:"Dargaling",
        pincode:874521
    },
    {
        id:10,
        name:"stark",
        age:45,
        phonenumber:7894512321,
        gender:"M",
        Address:"Dargaling",
        pincode:874522
    },
    {
        id:11,
        name:"Mark",
        age:25,
        phonenumber:7894963251,
        gender:"M",
        Address:"dsdsdsf",
        pincode:852189
    },
    ]   
    
    
    
    console.log(currentPage)
    const perPageData= data.slice(firstIndex,lastIndex)
    const n=Math.ceil(data.length/totalPerPageData)
    // console.log(n)
    console.log(perPageData)
    const nPages=[...Array(n+1).keys()].slice(1)
    console.log(nPages)
    const columns=["SlNo","Name","Age","Phonenumber","Gender","Address","Pincode"]

    function changeCurrentPage (id){
        setCurrentPage(id)
    }
    
    function previousPage (){
        if(currentPage!=lastIndex){
            setCurrentPage(currentPage-1)
        }
    }

    function nextPage(){
        if(currentPage!=lastIndex){
            setCurrentPage(currentPage+1)
        }
    }

    console.log(perPageData,"currentData")


    return(
        <div className="h-screen w-screen border border-black flex flex-col justify-center items-center ">
            <h1 className="text-black text-xl p-3 border  rounded-md">Person Details</h1>
            <div className="border border-black h-[76%] w-[70%] shadow-xl rounded-md border-b-0">
                <div className="h-[14%] w-full border border-green-500 flex justify-between">
                    <button className="border border-black m-5 p-5 flex gap-3 items-center text-md shadow-md rounded-md">
                        Filters
                        <FcFilledFilter className="text-2xl" />
                    </button>
                    <span className="border border-black m-5 p-2 flex gap-2 rounded-md  shadow-md justify-center items-center">
                        <FcSearch className="text-md"  />
                        <input  placeholder="Search" className="outline-none " />
                    </span>
                </div>
            <table className="table-auto ">
                <thead > 
                    <tr >
                        {
                            columns.map((each,index)=>{

                                return(
                                    <th key={index} className="w-[1%] border-l-0  border-r-1 border border-black">{each}</th>
                                )
                            })
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        perPageData.map((e,i)=>{
                            console.log(e)
                            return(
                                <tr key={i} >
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.id}</td>
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.name}</td>
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.age}</td>
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.phonenumber}</td>
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.gender}</td>
                                    <td className="w-[1%] p-3 border-l-0  border-r-1  text-center">{e.Address}</td>
                                    <td className="w-[1%] p-3 border-l-0 border-b-0 border-r-1 border text-center">{e.pincode}</td>
                                </tr>
                                
                            )
                        })
                    }

                </tbody>

            </table>
            </div>
                <div className="w-[70%] border border-black shadow-xl rounded-md p-2 border-t-0">
                   <div className="flex gap-2 flex-row justify-center items-center ">
                    <button disabled={currentPage==1} className={`${currentPage==1 ? "hidden":"block"}`} onClick={()=>previousPage()}>Prev</button>
                   <div className="flex gap-5">
                        {
                           
                            nPages.map((e,i)=>{
                                return(
                                <button  onClick={()=>changeCurrentPage(e)} key={i} className={`${currentPage == e? 'block':'hidden'}h-8 w-8 p-1 text-center rounded-full border border-green-400 `}>
                                    {e}
                                </button>

                                )
                            })
                        }
                       

                   </div>
                    <button disabled={currentPage==nPages.length} className={`${currentPage==nPages.length ? "hidden":"block"}`}   onClick={()=>nextPage()}>
                        Next
                    </button>
                   </div>
                </div>
        </div>
    )

}

export default DataTable