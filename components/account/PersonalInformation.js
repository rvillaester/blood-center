import React, { useEffect, useState } from "react";
import classes from "./PersonalInformation.module.css";
import { getUserId } from "../common";
import { useRouter } from "next/router";
import { constructAPIUrl } from "../common";

function PersonalInformation(props) {
  const router = useRouter();
  const [account, setAccount] = useState({
    name: '',
    email: '',
    birthday: '',
    bloodType: '',
    mobile: ''
  })

  async function fetchAccountInfo() {
    try {
      let url = constructAPIUrl(`searchAccount?id=${getUserId()}`);
      let response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log("error " + err);
    }
  }

  useEffect(async () => {
    if (!router.isReady) return;

    let res = await fetchAccountInfo();
    console.log(JSON.stringify(res));
    let data = JSON.parse(res.data);
    setAccount(data);
  }, [router.isReady, setAccount]);

  return (
    <div className={classes.container}>
      <table className={classes.entry}>
        <tr>
          <td>Name</td>
          <td>{account.name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{account.email}</td>
        </tr>
        <tr>
          <td>Birth Date</td>
          <td>{account.birthday}</td>
        </tr>
        <tr>
          <td>Blood Type</td>
          <td>{account.bloodType}</td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>{account.mobile}</td>
        </tr>
      </table>
    </div>
  );
}

export default PersonalInformation;
