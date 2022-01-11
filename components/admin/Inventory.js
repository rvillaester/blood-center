import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./Inventory.module.css";

const inventoryData = {
    id: '',
    available: 0,
    pending: 0,
    bloodType: ''
}

function Inventory() {
    const [dataA, setDataA] = useState(inventoryData);
    const [dataB, setDataB] = useState(inventoryData);
    const [dataAB, setDataAB] = useState(inventoryData);
    const [dataO, setDataO] = useState(inventoryData);

    const router = useRouter();

    async function findInventory(){
        try{
        let url = `https://njwckx30s1.execute-api.ap-southeast-1.amazonaws.com/dev/inventory`;
        let response = await fetch(url);
        return await response.json();
        }catch(err){
            console.log('error ' + err);
        }
    }

    function onBackHandler() {
        router.push('/admin');
    }

    useEffect(async () => {
        let res = await findInventory();
        let dataA = JSON.parse(res.dataA);
        setDataA(dataA);
        let dataB = JSON.parse(res.dataB);
        setDataB(dataB);
        let dataAB = JSON.parse(res.dataAB);
        setDataAB(dataAB);
        let dataO = JSON.parse(res.dataO);
        setDataO(dataO);
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

                <tr>
                    <td>{dataA.bloodType}</td>
                    <td>{dataA.available}</td>
                    <td>{dataA.pending}</td>
                </tr>
                <tr>
                    <td>{dataB.bloodType}</td>
                    <td>{dataB.available}</td>
                    <td>{dataB.pending}</td>
                </tr>
                <tr>
                    <td>{dataAB.bloodType}</td>
                    <td>{dataAB.available}</td>
                    <td>{dataAB.pending}</td>
                </tr>
                <tr>
                    <td>{dataO.bloodType}</td>
                    <td>{dataO.available}</td>
                    <td>{dataO.pending}</td>
                </tr>
            </table>

            
            <div className={classes.actions}>
                <button onClick={onBackHandler}>Back</button>
            </div>
        </div>
      )
}

export default Inventory;