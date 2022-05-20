import React, { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { addData,updateData,delData } from "./context/ContextProvider";

const Home = () => {
  const [getuserData, setUserData] = useState([]);
  // console.log(getuserData);


  const { udata } = useContext(addData);

  const {updata} = useContext(updateData);

  const {dltdata, setDLTdata} = useContext(delData);
  const getData = async (e) => {
    const res = await fetch("/getData", {
      // main path is in package.json
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert("Error");
      console.log(res);
    } else {
      setUserData(data);
      // console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteData = await res2.json();
    if (res2.status === 422 || !deleteData) {
      alert("Error");
      // console.log(res);
    } else {
      alert("Deleted");
      // console.log("get data");
      setDLTdata(deleteData)
      getData();
    }
  };
  return (
    <>
        {
                udata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add Users
            </NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Mob. Number</th>
                <th scope="col" aria-disabled>
                  Image
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserData.map((e, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.work}</td>
                      <td>{e.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${e._id}`}>
                          {" "}
                          <button className="btn btn-success">
                            <VisibilityIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${e._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <ModeEditIcon />
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-warning"
                          onClick={() => deleteUser(e._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
