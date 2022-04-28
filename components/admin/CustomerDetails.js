import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "./CustomerDetails.module.css";
import { getFormattedDateToday, constructAPIUrl, isAdmin } from "../common";

function CustomerDetails() {
  const router = useRouter();
  let refNo = router.query.referenceNo;
  console.log(`id ${refNo}`);
  const [hasHistory, setHasHistory] = useState(false);
  const [customer, setCustomer] = useState({
    requestStatus: "",
    requestType: "",
    id: "",
    name: "",
    birthday: "",
    bloodType: "",
    mobile: "",
    quantity: "",
    email: "",
    appointmentDate: "",
    cancelledDate: "",
    reason: "",
    completedDate: "",
    createdDate: "",
    appointmentDate: "",
    donor: "",
  });

  function onBackHandler() {
    router.push("/dashboard");
  }

  function onHistoryHandler() {
    router.push({
      pathname: "/dashboard/history",
      query: {
        referenceNo: refNo,
        email: customer.email,
      },
    });
  }

  function onScheduleAppointmentHandler() {
    router.push({
      pathname: "/dashboard/appointment",
      query: {
        referenceNo: refNo,
      },
    });
  }

  async function onCompleteHandler() {
    let today = getFormattedDateToday();
    if (customer.appointmentDate > today) {
      alert(
        "Completing this request should only be done on or after appointment date"
      );
      return;
    }
    let url = constructAPIUrl("takeAction");
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "Completed",
        id: refNo,
      }),
    });

    let data = await response.json();
    console.log(data);
    const { code, message } = data;
    if (code === 101) {
      // only for Request where not enough in inventory
      alert(message);
    } else {
      router.push({
        pathname: "/dashboard/confirmation",
        query: {
          action: "Completed",
        },
      });
    }
  }

  async function onCancelHandler() {
    router.push({
      pathname: "/dashboard/cancel",
      query: {
        referenceNo: refNo,
      },
    });
  }

  async function findById(id) {
    console.log("find " + refNo + "ff");
    try {
      let url = constructAPIUrl(`searchById?id=${id}`);
      let response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log("error " + err);
    }
  }

  useEffect(async () => {
    if (!router.isReady) return;

    console.log("useeffect " + refNo);
    let res = await findById(refNo);
    console.log(JSON.stringify(res));
    let data = JSON.parse(res.data);
    let hasHistory = res.hasHistory;
    console.log(`data: ${data} | has history: ${hasHistory}`);

    setHasHistory(hasHistory);
    setCustomer(data);
  }, [router.isReady, setCustomer]);

  return (
    <div className={classes.container}>
      <table className={classes.entry}>
        <tr>
          <td>Status</td>
          <td>{customer.requestStatus}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{customer.requestType}</td>
        </tr>
        <tr>
          <td>Reference No</td>
          <td>{customer.id}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{customer.name}</td>
        </tr>
        <tr>
          <td>Birth Date</td>
          <td>{customer.birthday}</td>
        </tr>
        <tr>
          <td>Blood Type</td>
          <td>{customer.bloodType}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{customer.email}</td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>{customer.mobile}</td>
        </tr>
        <tr>
          <td>Quantity (ml)</td>
          <td>{customer.quantity}</td>
        </tr>
        {customer.requestType == "request" && customer.donor != "" && (
          <tr>
            <td>Donor</td>
            <td>{customer.donor}</td>
          </tr>
        )}
        <tr>
          <td>Created Date</td>
          <td>{customer.createdDate.split(" ")[0]}</td>
        </tr>
        {customer.requestStatus == "Cancelled" && (
          <tr>
            <td>Cancelled Date</td>
            <td>{customer.cancelledDate}</td>
          </tr>
        )}
        {customer.requestStatus == "Cancelled" && (
          <tr>
            <td>Cancellation Reason</td>
            <td>{customer.reason}</td>
          </tr>
        )}
        {customer.requestStatus == "Scheduled" && (
          <tr>
            <td>Appointment Date</td>
            <td>{customer.appointmentDate}</td>
          </tr>
        )}
        {customer.requestStatus == "Completed" && (
          <tr>
            <td>Completed Date</td>
            <td>{customer.completedDate}</td>
          </tr>
        )}
      </table>

      <div className={classes.actions}>
        <button onClick={onBackHandler}>Back</button>
        {(customer.requestStatus == "Pending" ||
          customer.requestStatus == "Scheduled") && (
          <button onClick={onCancelHandler}>Cancel</button>
        )}
        {isAdmin() && customer.requestStatus == "Scheduled" && (
          <button onClick={onCompleteHandler}>Complete</button>
        )}
        {isAdmin() && customer.requestStatus == "Pending" && (
          <button onClick={onScheduleAppointmentHandler}>
            Schedule Appointment
          </button>
        )}
        {isAdmin() && hasHistory && <button onClick={onHistoryHandler}>History</button>}
      </div>
    </div>
  );
}

export default CustomerDetails;
