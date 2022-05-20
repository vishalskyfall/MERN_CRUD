import React, { useContext, useEffect, useState } from "react";
import {   useNavigate, useParams } from "react-router-dom";
import { updateData } from "./context/ContextProvider";

const Edit = () => {
  const { setUPdata} = useContext(updateData);
  const redirect =  useNavigate("");
  const [inputV, setInputV] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });
  const setdata = (e) => {
    const { name, value } = e.target;
    setInputV((preV) => {
      return {
        ...preV,
        [name]: value,
      };
    });
  };
  // const [getuserData, setUserData] = useState([]);
  // // console.log(getuserData);


  const { id } = useParams("");
  // console.log(id);

  const getData = async () => {

    const res = await fetch(`/getuser/${id}`, {
      // main path is in package.json
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    const data = await res.json();
    // console.log(data);
    if (res.status === 422 || !data) {
      // alert("Error ");
      // console.log("error");
    } else {
      setInputV(data);
      // console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const updateUser = async(e)=>{
    e.preventDefault()
    const {name, email, work, add, mobile, desc, age} = inputV

    const response=await fetch(`/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name, email, work, add, mobile, desc, age
      })
    }) 
    const data2 = await response.json();
    if (response.status === 422 || !data2) {
      alert("Fill data! ");
      // console.log("error");
    } else {
      setInputV(data2);
      alert("Data updated / . ..")
      redirect("/")
      setUPdata(data2)
      // console.log("get data");
    }
  }
  return (
    <div className="container">
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              value={inputV.name}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputPassword1"
              name="email"
              value={inputV.email}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="age"
              value={inputV.age}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Mob. Number
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              name="mobile"
              value={inputV.mobile}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="work"
              value={inputV.work}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="address"
              value={inputV.address}
              onChange={setdata}
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="desc"
              value={inputV.desc}
              onChange={setdata}
            />
          </div>
          <button type="submit" onClick={updateUser} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
