import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";

const Register = () => {

  const {setUdata} = useContext(addData)
  


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

  const addInpData = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, desc } = inputV;
    const res = await fetch("/register", { // main path is in package.json
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc
      }),
    });
    const data = await res.json();
    if(res.status===422 ||!data){
      alert("Error");
      console.log(res);
    }
    else{
      alert("Data added!")
       setUdata(data)
      redirect("/")
    }
  };

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
          <button
            type="submit"
            onClick={addInpData}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
