import React, { useEffect, useState } from "react";

const fetch = require(`node-fetch`)

// export default function App(props) {
//   return <Findout />;
// }


export default function Lifecycle() {

      const [myvar, setmyvar] = useState("");


  useEffect(() => {
    try {

        fetch('http://127.0.0.1:4000/test')
            .then(res => res.json())
            .then(body => setmyvar({body}))
    } catch (err) {
        console.log("error")
    }

    },[])


    console.log("myvar " + JSON.stringify(myvar))

         if (myvar) {
             var stockitems = Object.entries(myvar["body"]).map(([key, value]) => {
                 return (
                     <div key={key}>{key} : {value.toString()}</div>
                 );
             })
         }

            return (
                < div id = "othermain" >
                    {stockitems && stockitems}
                </div>
            )
        }




