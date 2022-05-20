import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import {  useNavigate, useParams } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { NavLink } from "react-router-dom";
import { delData } from "./context/ContextProvider";


const Detail = () => {
  const { setUPdata} = useContext(delData);
  const redirect = useNavigate("")
  const [getuserData, setUserData] = useState([]);
  // console.log(getuserData);

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
      setUserData(data);
      // console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser=async(id)=>{
    const res2 = await fetch(`/deleteUser/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const deleteData = await res2.json()
    if (res2.status === 422 || !deleteData) {
      alert("Error");
      // console.log(res);
    } else {
     alert("Deleted")
      // console.log("get data");
      redirect("/")
      setUPdata("deleteData")
    }
  }
  return (
    <div className="container mt-3 ">
      <h1 style={{ fontWeight: 400 }}>Welcome {getuserData.name}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getuserData._id}`}>
              {" "}
              <button className="btn btn-primary">
                <ModeEditIcon />
              </button>
            </NavLink>
            <button className="btn btn-warning" onClick={()=>deleteUser(getuserData._id)}>
                          <DeleteIcon />
                        </button>
          </div>
          <div className="row">
            {" "}
            <div className="left_view col-lg-6 col-md-6 col-12">
              {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
              <h3 className="mt-3">
                Name :{" "}
                <span style={{ fontWeight: 400 }}>{getuserData.name}</span>
              </h3>
              <p className="mt-3">
                Age : <span style={{ fontWeight: 400 }}>{getuserData.age}</span>
              </p>
              <p className="mt-3">
                <MailOutlineIcon />
                Email :{" "}
                <span style={{ fontWeight: 400 }}>{getuserData.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Occupation:{" "}
                <span style={{ fontWeight: 400 }}>{getuserData.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <MobileFriendlyIcon />
                Mobile :{" "}
                <span style={{ fontWeight: 400 }}>
                  +91 {getuserData.mobile}
                </span>{" "}
              </p>
              <p className="mt-3">
                <LocationCityIcon />
                Location :
                <span style={{ fontWeight: 400 }}>
                  {" "}
                  {getuserData.address}
                </span>{" "}
              </p>
              <p className="mt-3">
                Description :
                <span style={{ fontWeight: 400 }}> {getuserData.desc}</span>{" "}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
