import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { addData } from "../services/api";
import { Data } from "../services/api";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const [dataMap, setdataMap] = useState("");

  const NewAccount = async (data) => {
    const mapUser = new Map();
    for (let i = 0; i < dataMap.length; i++) {
      mapUser.set(dataMap[i].userName, dataMap[i]);
    }

    if (data.order == 1) {
      var pinval = Number(data.pin) + Number(data.num);
      var str = pinval.toString();
    } else {
      var pinval = Number(data.pin) - Number(data.num);
      var str = pinval.toString();
    }

    var rant1 = Math.floor(Math.random() * 10).toString();
    var rant2 = Math.floor(Math.random() * 10).toString();
    var rant3 = Math.floor(Math.random() * 10).toString();
    var rant4 = Math.floor(Math.random() * 10).toString();
    var conv = Number(data.pin) + Number(data.num);
    var str = conv.toString();
    var datarant = rant1 + rant2 + str + rant4 + rant3;

    var ranNum1 = Math.floor(Math.random() * 2).toString();
    var ranNum2 = Math.floor(Math.random() * 2).toString();
    var ranNum3 = Math.floor(Math.random() * 2).toString();
    var ranNum4 = Math.floor(Math.random() * 2).toString();
    var orderNum = ranNum1 + ranNum2 + data.order + ranNum4 + ranNum3;

    var ran1 = Math.floor(Math.random() * 10).toString();
    var ran2 = Math.floor(Math.random() * 10).toString();
    var ran3 = Math.floor(Math.random() * 10).toString();
    var ran4 = Math.floor(Math.random() * 10).toString();
    var dataNum = ran1 + ran2 + data.num + ran4 + ran3;

    const finalData = {
      userName: data.name,
      Email: data.email,
      Pin: datarant,
      Orders: orderNum,
      Inc: dataNum,
      Attempt: 0,
      BlockT: 0,
    };
    // console.log(str);
    if (!mapUser.has(data.name.trim())) {
      let sendData = await addData(finalData);

      if (sendData.data == "Record Updated Successfully Added To The DB") {
        // window.location.href = "/";
      }
    }

    window.location.href = "/login";
  };

  const loadData = async () => {
    let getData = await Data();
    setdataMap(getData.data[0]);
  };

  useEffect(() => {
    loadData();
  });
  return (
    <>
      <div className="signupPage"></div>
      <form onSubmit={handleSubmit(NewAccount)} className="form shadow">
        <img
          src="https://img.icons8.com/ios/50/000000/fingerprint.png"
          className="img"
        />
        <br></br>
        <label htmlFor="" className="border-bottom">
          <input
            {...register("name", {
              required: "* Enter U R Name",
            })}
            name="name"
            type="text"
            placeholder="UserName"
            className="form-control-plaintext ms-2 outline"
          />
          <p className="text-danger" style={{ fontSize: "12px" }}>
            {errors.name?.message}
          </p>
        </label>
        <br></br>
        <label className="border-bottom">
          <input
            {...register("email", {
              required: "* Please Enter Your Email",
            })}
            // name="email"
            type="text"
            placeholder="Email"
            className="form-control-plaintext ms-2 outline"
          />
          <p className="text-danger" style={{ fontSize: "12px" }}>
            {errors.email?.message}
          </p>
        </label>
        <br></br>
        <label className="border-bottom">
          <input
            {...register("pin", {
              required: "* PIN Is Required",
            })}
            name="pin"
            type="password"
            placeholder="PIN"
            className="form-control-plaintext ms-2 outline"
          />
          <p className="text-danger" style={{ fontSize: "12px" }}>
            {errors.pin?.message}
          </p>
        </label>
        <br></br>
        <div className="d-flex mt-3">
          <label className="my-2 me-3">Order</label>
          <br />
          <div>
            <input
              {...register("order")}
              type="radio"
              name="order"
              id="Increment"
              value="1"
              className="form-check-input"
              // defaultValue="Increment"
            />
            <label htmlFor="Increment" className="form-check-label ms-3">
              Increment
            </label>
            <br></br>
            <input
              {...register("order")}
              type="radio"
              id="Decrement"
              name="order"
              className="form-check-input"
              value="0"
              // defaultValue="Decrement"
            />

            <label htmlFor="Decrement" className="form-check-label ms-3">
              Decrement
            </label>
          </div>
        </div>
        {/* <br></br> */}
        <label htmlFor="" className="border-bottom">
          <input
            {...register("num", {
              required: "* Enter U R Name",
            })}
            name="num"
            type="text"
            placeholder="1-Digit"
            className="form-control-plaintext ms-2 outline"
          />
          <p className="text-danger" style={{ fontSize: "12px" }}>
            {errors.num?.message}
          </p>
        </label>
        <br></br>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
