import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "./CustomerDetails.module.css";

function CustomerDetails() {
    const router = useRouter()
    let refNo = router.query.referenceNo;
    console.log(`id ${refNo}`);
    const [customer, setCustomer] = useState({
        requestStatus: '',
        requestType: '',
        id: '',
        name: '',
        birthday: '',
        bloodType: '',
        mobile: '',
        quantity: ''
    });

    async function takeAction(action, id) {
        console.log(`${action} - ${id}`);
        let url = 'https://njwckx30s1.execute-api.ap-southeast-1.amazonaws.com/dev/takeAction';
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                action: action,
                id: id,
            })
        })
        console.log('goood');
    }

    function onBackHandler() {
        router.push('/admin');
    }

    async function onCompleteHandler() {
        await takeAction('Completed', refNo);
        router.push(
            {
              pathname: '/admin/confirmation',
              query: 
                {
                    action: 'Completed'
                }
            },
          );
    }

    async function onCancelHandler() {
        await takeAction('Cancelled', refNo);
        router.push(
            {
              pathname: '/admin/confirmation',
              query: 
                {
                    action: 'Cancelled'
                }
            },
          );
        
    }

    async function findById(id){
        console.log('find ' + refNo + 'ff');
        try{
        let url = `https://njwckx30s1.execute-api.ap-southeast-1.amazonaws.com/dev/searchById?id=${id}`;
        let response = await fetch(url);
        return await response.json();
        }catch(err){
            console.log('error ' + err);
        }
    }

    useEffect(async () => {
        if(!router.isReady) return;

        console.log('useeffect ' + refNo)
        let res = await findById(refNo);
        let data = JSON.parse(res.data);
        console.log(data);
        
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
                    <td>Mobile Number</td>
                    <td>{customer.mobile}</td>
                </tr>
                <tr>
                    <td>Quantity (ml)</td>
                    <td>{customer.quantity}</td>
                </tr>
            </table>

            
            <div className={classes.actions}>
                <button onClick={onBackHandler}>Back</button>
                { (customer.requestStatus == 'Pending') && 
                    (
                        <button onClick={onCancelHandler}>Cancel</button>
                    )
                }
                { (customer.requestStatus == 'Pending') && 
                    (
                        <button onClick={onCompleteHandler}>Complete</button>
                    )
                }
            </div>
        </div>
    );
}

export default CustomerDetails;