import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { Data } from "../services/api";
import { Reset } from "../services/api";
import { Attempt } from "../services/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const [dataMap, setdataMap] = useState("");
  const [hint, sethint] = useState("");
  const [Attemt, setAttemt] = useState("");

  const Account = async (data) => {
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime());
    var actualTime = currentDate.getHours() + ":" + currentDate.getMinutes();

    const mapUser = new Map();
    for (let i = 0; i < dataMap.length; i++) {
      mapUser.set(dataMap[i].userName, dataMap[i]);
    }
    var strpin = data.pin.toString();

    var Inc = mapUser.get(data.name).Inc;
    var ordInc = Inc.toString().split("")[2];
    var hint = await mapUser.get(data.name).Pin.slice(2, 6);
    sethint(Number(hint) - ordInc);

    if (
      (await mapUser.get(data.name).Pin.slice(2, 6)) == data.pin &&
      mapUser.get(data.name).BlockT <= 3
    ) {
      var ord = mapUser.get(data.name).Orders;

      var orders = ord.toString().split("");
      var Inc = mapUser.get(data.name).Inc;
      var ordInc = Inc.toString().split("")[2];

      if (orders[2] == 1) {
        var pinval = Number(strpin) + Number(ordInc);
        var str = pinval.toString();
      } else {
        var pinval = Number(strpin) - Number(ordInc);
        var str = pinval.toString();
      }

      var rant1 = Math.floor(Math.random() * 10).toString();
      var rant2 = Math.floor(Math.random() * 10).toString();
      var rant3 = Math.floor(Math.random() * 10).toString();
      var rant4 = Math.floor(Math.random() * 10).toString();
      var conv = Number(data.pin) + Number(ordInc);
      var str = conv.toString();
      var datarant = rant1 + rant2 + str + rant4 + rant3;

      var ID = mapUser.get(data.name).ID;
      var ResetPass = {
        userName: ID,
        Pin: datarant,
        Attempt: 0,
        BlockT: 0,
      };

      let sendData = await Reset(ResetPass);
      if (sendData.data == "Record Updated Successfully") {
        window.location.href = "/";
      }
    } else if (Number(mapUser.get(data.name).Attempt) <= 2) {
      var at = Number(mapUser.get(data.name).Attempt) + 1;
      var ID = mapUser.get(data.name).ID;
      var attemptPass = {
        userName: ID,
        Attempt: at,
        BlockT: 0,
      };
      let Att = await Attempt(attemptPass);
      setAttemt("Only 3 attempts are available!");
    } else if (Number(mapUser.get(data.name).Attempt) == 3) {
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime() + 10 * 60000);
      var time = futureDate.getHours() + ":" + futureDate.getMinutes();

      var at = Number(mapUser.get(data.name).Attempt) + 1;
      var ID = mapUser.get(data.name).ID;
      var attemptPass = {
        userName: ID,
        Attempt: at,
        BlockT: time,
      };
      let Att = await Attempt(attemptPass);

      setAttemt("Last attempt");
    } else if (mapUser.get(data.name).Attempt == 4) {
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime());
      var actualTime = currentDate.getHours() + ":" + currentDate.getMinutes();
      if (actualTime > mapUser.get(data.name).BlockT) {
        var at = Number(mapUser.get(data.name).Attempt) + 1;
        var ID = mapUser.get(data.name).ID;
        var attemptPass = {
          userName: ID,
          Attempt: 0,
          BlockT: 0,
        };
        let Att = await Attempt(attemptPass);
      }
      setAttemt("Your Ac Has Been Block For 10mins!");
    }
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
      <div className="loginIn">
        <div className="dataImg"></div>
        <form onSubmit={handleSubmit(Account)} className="loginForm">
          <h3 className="mb-3">Login</h3>
          <div>
            <label htmlFor="" className="border-bottom mb-3">
              <input
                {...register("name", {
                  required: "* Please Enter Your name",
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
            <label htmlFor="" className="border-bottom mb-3">
              <input
                {...register("pin", {
                  required: "* Please Enter Your PIN",
                })}
                name="pin"
                type="text"
                placeholder="4-Digit"
                className="form-control-plaintext ms-2 outline"
              />
              <p className="text-danger" style={{ fontSize: "12px" }}>
                {errors.pin?.message}
              </p>
            </label>
            <br></br>
            <button type="submit" className="btn btn-primary mb-3">
              Login
            </button>
            <br></br>
            <span>Hint-</span>
            <span>{hint}</span>
            <br></br>
          </div>
          <p className="mt-3 text-danger">{Attemt}</p>
        </form>{" "}
      </div>
    </>
  );
};

export default Login;
