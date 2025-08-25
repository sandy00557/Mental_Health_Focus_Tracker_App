// import { useState } from "react";

// //since PasswordInput is a reusable component, we willl place it in components folder
// const PasswordInput=({placeholderz})=>{
//     const [password,setPassword]=useState("");
//     const [show,setShow]=useState(false);
//     const isValidPassword = (val) =>
//     /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(val);
//     return(
//         <>
//             {isValidPassword(password) ?
//             (
//             <>
//             <input type={show ? "text" : "password"} required placeholder={placeholderz} onChange={(e)=>setPassword(e.target.value)}/>
//             <button type="button" onClick={()=>setShow(prev=>!prev)}>{show ? "Hide" : "Show"}</button>
//             </>
//             )
//             :
//             (
//             <>
//             <input type={show ? "text" : "password"} required placeholder={placeholderz} onChange={(e)=>setPassword(e.target.value)}/>
//             <button type="button" onClick={()=>setShow(prev=>!prev)}>{show ? "Hide" : "Show"}</button>
//             {isValidPassword(password) ? null : (<p style={{color:"red"}}>Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</p>)}
//             </>
//             )
//             }
//         </>
//     )
// }
// export default PasswordInput;





import { useState } from "react";

//since PasswordInput is a reusable component, we willl place it in components folder
const PasswordInput=({placeholderz,password,finalPassword,compareWith})=>{
    const [show,setShow]=useState(false);
    const passwordType1= placeholderz === "Enter your password"; //will return true or false
    const passwordType2= placeholderz === "Enter your confirmed password";

    const isValidPassword = (val) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(val);

    const showValidation = password && passwordType1 && !isValidPassword(password);
    const showMismatch= password && passwordType2 && !(compareWith===password);
    return(
        <>
            <>
            <input type={show ? "text" : "password"} required placeholder={placeholderz} onChange={(e)=>finalPassword(e.target.value)}/>
            <button type="button" onClick={()=>setShow(prev=>!prev)}>{show ? "Hide" : "Show"}</button>
            {/* {placeholderz === "Enter your password"}
            {isValidPassword(password) ? null : (<p style={{color:"red"}}>Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</p>)} */}
            {
                showValidation && 
                <p style={{color:"red"}}>Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</p>
            }
            {
                showMismatch && 
                <p style={{color:"red"}}>Passwords do not match.</p>
            }
            </>
        </>
    )
}
export default PasswordInput;