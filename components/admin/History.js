import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "./History.module.css";
import { constructAPIUrl } from "../common";

function History(props) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  let email = router.query.email;
  let refNo = router.query.referenceNo;

  function onBackHandler() {
    router.push({
      pathname: "/admin/view",
      query: {
        referenceNo: refNo,
      },
    });
  }

  async function search() {
    let url = constructAPIUrl(`history?email=${email}`);
    let response = await fetch(url);
    return await response.json();
  }
  useEffect(async () => {
    let data = await search();
    let items = JSON.parse(data.items);
    console.log(items);
    setItems(items);
  }, [router.isReady]);
  return (
    <React.Fragment>
      <table className={classes.history}>
        <tr>
          <th>Reference No.</th>
          <th>Name</th>
          <th>Type</th>
          <th>Blood Type</th>
          <th>Status</th>
          <th>Email</th>
          <th>Completed Date</th>
          <th>Cancelled Date</th>
          <th>Ongoing Date</th>
        </tr>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.requestType}</td>
            <td>{item.bloodType}</td>
            <td>{item.requestStatus}</td>
            <td>{item.email}</td>
            <td>{item.completedDate}</td>
            <td>{item.cancelledDate}</td>
            {item.requestStatus == "Pending" && (
              <td>{item.createdDate.split(" ")[0]}</td>
            )}
            {item.requestStatus == "Scheduled" && (
              <td>{item.appointmentDate}</td>
            )}
            {item.requestStatus != "Pending" &&
              item.requestStatus != "Scheduled" && <td></td>}
          </tr>
        ))}
      </table>

      <div className={classes.actions}>
        <button onClick={onBackHandler}>Back</button>
      </div>
    </React.Fragment>
  );
}

export default History;
