import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import classes from "./BloodList.module.css";
import { constructAPIUrl, isAdmin, getUserId } from "../common";

function BloodList(props) {
  const typeInputRef = useRef();
  const bloodTypeInputRef = useRef();
  const statusInputRef = useRef();
  const router = useRouter();
  const [items, setItems] = useState([]);

  function onViewHandler(id) {
    console.log("id=" + id);
    router.push({
      pathname: "/dashboard/view",
      query: {
        referenceNo: id,
      },
    });
  }

  async function onSearchHandler() {
    let data = await search();
    console.log("response: " + JSON.stringify(data));
    let items = JSON.parse(data.items);
    setItems(items);
  }

  async function onInventoryHandler() {
    router.push("/dashboard/inventory");
  }

  async function search() {
    let url = constructAPIUrl("search");
    let bloodType = (bloodTypeInputRef && bloodTypeInputRef.current) ? bloodTypeInputRef.current.value : 'All';
    console.log(bloodType);
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        type: typeInputRef.current.value,
        bloodType: bloodType,
        status: statusInputRef.current.value,
        userId: getUserId()
      }),
    });
    return await response.json();
  }

  useEffect(async () => {
    let data = await search();
    let items = JSON.parse(data.items);
    console.log(items);
    setItems(items);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.search}>
        <div className={classes.control}>
          <label htmlFor="type">Type</label>
          <select id="type" name="type" ref={typeInputRef} defaultValue="All">
            <option value="All">All</option>
            <option value="donation">Donate</option>
            <option value="request">Request</option>
          </select>
        </div>
        { isAdmin() && 
          <div className={classes.control}>
            <label htmlFor="type">Blood Type</label>
            <select
              id="type"
              name="type"
              ref={bloodTypeInputRef}
              defaultValue="All"
            >
              <option value="All">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            
            
            </select>
          </div>
        }
        <div className={classes.control}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            ref={statusInputRef}
            defaultValue="All"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className={classes.control}>
          <div className={classes.actions}>
            <button type="button" onClick={onSearchHandler}>
              Search
            </button>
            { isAdmin() && 
              <button type="button" onClick={onInventoryHandler}>
                Inventory
              </button>
            }
          </div>
        </div>
      </div>

      <table className={classes.bloodlist}>
        <tr>
          <th>Reference No.</th>
          <th>Name</th>
          <th>Type</th>
          <th>Blood Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {items
          .filter((item) => item.requestType != "inventory")
          .sort((a, b) => {
            if (a.createdDate < b.createdDate) {
              return 1;
            }
            if (a.createdDate > b.createdDate) {
              return -1;
            }
            return 0;
          })
          .map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.requestType}</td>
              <td>{item.bloodType}</td>
              <td>{item.requestStatus}</td>
              <td>
                <div className={classes.actions}>
                  <a onClick={onViewHandler.bind(null, item.id)}>View</a>
                </div>
              </td>
            </tr>
          ))}
      </table>
    </React.Fragment>
  );
}

export default BloodList;
