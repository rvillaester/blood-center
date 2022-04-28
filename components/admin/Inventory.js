import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./Inventory.module.css";
import { constructAPIUrl } from "../common";

const inventoryData = {
  id: "",
  available: 0,
  pending: 0,
  bloodType: "",
};

function Inventory() {
//   const [dataANeg, setDataANeg] = useState(inventoryData);
//   const [dataAPos, setDataAPos] = useState(inventoryData);
//   const [dataBNeg, setDataBNeg] = useState(inventoryData);
//   const [dataBPos, setDataBPos] = useState(inventoryData);
//   const [dataABNeg, setDataABNeg] = useState(inventoryData);
//   const [dataABPos, setDataABPos] = useState(inventoryData);
//   const [dataONeg, setDataONeg] = useState(inventoryData);
//   const [dataOPos, setDataOPos] = useState(inventoryData);

  const [inventory, setInventory] = useState([]);

  const router = useRouter();

  async function findInventory() {
    try {
      let url = constructAPIUrl('inventory');
      let response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log("error " + err);
    }
  }

  function onBackHandler() {
    router.push("/dashboard");
  }

  useEffect(async () => {
    let res = await findInventory();
    let dataANeg = JSON.parse(res.dataANeg);
    // setDataANeg(dataANeg);
    let dataAPos = JSON.parse(res.dataAPos);
    // setDataAPos(dataAPos);
    let dataBNeg = JSON.parse(res.dataBNeg);
    // setDataBNeg(dataBNeg);
    let dataBPos = JSON.parse(res.dataBPos);
    // setDataBPos(dataBPos);
    let dataABNeg = JSON.parse(res.dataABNeg);
    // setDataABNeg(dataABNeg);
    let dataABPos = JSON.parse(res.dataABPos);
    // setDataABPos(dataABPos);
    let dataONeg = JSON.parse(res.dataONeg);
    // setDataONeg(dataONeg);
    let dataOPos = JSON.parse(res.dataOPos);
    // setDataOPos(dataOPos);

    let data = [
      dataANeg,
      dataAPos,
      dataBNeg,
      dataBPos,
      dataABNeg,
      dataABPos,
      dataONeg,
      dataOPos,
    ];
    setInventory(data);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Blood Inventory</div>
      <table className={classes.inventory}>
        <tr>
          <th>Blood Type</th>
          <th>Available (ml)</th>
          <th>Pending (ml)</th>
        </tr>
        {inventory.map((item) => (
          <tr key={item.bloodType}>
            <td>{item.bloodType}</td>
            <td>{item.available}</td>
            <td>{item.pending}</td>
          </tr>
        ))}
      </table>

      <div className={classes.actions}>
        <button onClick={onBackHandler}>Back</button>
      </div>
    </div>
  );
}

export default Inventory;
