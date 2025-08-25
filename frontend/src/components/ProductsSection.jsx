// import API from "../api/axios";
// import { useState, useEffect } from "react";

// const ProductsSection = () => {
//   const [productz, setProductz] = useState([]);
//   const [productsFailure, setProductsFailure] = useState(false);
//   const [productsSuccess, setProductsSuccess] = useState(true);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/products/");
//         setProductsSuccess(true);
//         setProductz(response.data.data); //without .data.data it is only an object and we cannot use map method or any fetching in it.
//         console.log(
//           "Products fetched successfully:",
//           response.data
//         ); /*{status: 'success', data: Array(10)}
// data
// :
// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// status
// :
// "success"
// [[Prototype]]
// :
// Object  = It is only an object*/
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsFailure(true);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // const pdfDownload = (url, filename) => {
//   //   const link = document.createElement("a");
//   //   link.href = url;
//   //   link.download = filename;
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };

//   // const pdfDownload = (url, filename) => {
//   //   fetch(url)
//   //     .then((response) => {
//   //       if (!response.ok) throw new Error("Network response was not ok.");
//   //       return response.blob(); // get file data as Blob
//   //     })
//   //     .then((blob) => {
//   //       const blobUrl = window.URL.createObjectURL(blob); // create blob URL
//   //       const link = document.createElement("a"); // create a temporary anchor element
//   //       link.href = blobUrl;
//   //       link.download = filename || "download.pdf"; // set download filename
//   //       document.body.appendChild(link); // append to body
//   //       link.click(); // trigger download
//   //       link.remove(); // remove anchor after click
//   //       window.URL.revokeObjectURL(blobUrl); // free memory
//   //     })
//   //     .catch((error) => {
//   //       console.error("Download failed:", error);
//   //       alert("Failed to download file. Please try again.");
//   //     });
//   // };
//   const BuyButton = () => {
//   const handleBuy = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/v1/pdf/download", {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to download PDF");
//       }

//       // Convert response to blob
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Create a hidden link & trigger download
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//     }
//   };

//   return (
//     <>
//       <h3>Welcome to Products Section</h3>
//       {console.log("Products data new:", productz)}
//       {productsSuccess && (
//         <>
//           <h3>Products are listed below</h3>
//           {/* {productz.map((product, index) => (
//             <h3 key={index}>{product.name}</h3>
//           ))} */}
//           {productz.map((product, index) => (
//             <div key={index}>
//               {/* <h3 key={index}>{product}</h3>  We cannot fetch fully like this*/}
//               <h3>{product.name}</h3>
//               <img
//                 src={product.image}
//                 style={{ width: "100px", height: "100px" }}
//               />
//               <h3>Rating: {product.rating}⭐</h3>
//               <h3>Discounted Amount: {product.discountAmount}</h3>
//               <h3 style={{ textDecoration: "line-through", color: "grey" }}>
//                 Amount: {product.Amount}
//               </h3>
//               {/* <a href={product.bookLink} /> */}
//               {/* <a
//                 href={product.buyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Buy
//               </a> */}
//               <button onClick={handleBuy}>Buy / Download PDF</button>
//             </div>
//           ))}
//           {/* {console.log("Productz:", productz[0]?.name)}
//           <h1>{productz[0]?.name || "Loading..."}</h1> */}
//         </>
//       )}
//       {productsFailure && <h1>Error fetching the products data.</h1>}
//     </>
//   );
// };
// export default ProductsSection;

// version 2: final
// import API from "../api/axios";
// import { Helmet } from "react-helmet-async";
// import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { selectPoints } from "../redux/userSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { selectPoints, setPoints } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";
// const ProductsSection = () => {
//   const [productz, setProductz] = useState([]);
//   const [productsFailure, setProductsFailure] = useState(false);
//   const [productsSuccess, setProductsSuccess] = useState(true);
//   // const globalPoints = useSelector((state) => state.user.points);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let globalPoints_Products = useSelector(selectPoints);
//   const userId = "68955900ea39ddff800e24ba";
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/products/");
//         dispatch(setPoints(response.data.points));
//         setProductsSuccess(true);
//         setProductz(response.data.data);
//         console.log("Products fetched successfully:", response.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsFailure(true);
//       }
//     };
//     fetchProducts();
//   }, [dispatch, userId]);

//   // PDF download handler
//   // const handleBuy = async (product) => {
//   //   if (globalPoints_Products < product.discountAmount) {
//   //     const result = window.confirm(
//   //       "You don't have enough points to buy this product. Do you want to play games and add more points?"
//   //     );
//   //     if (result) {
//   //       navigate("/DashBoardPage");
//   //     } else {
//   //       console.log("Hi");
//   //     }
//   //     return;
//   //   } else if (globalPoints_Products >= product.discountAmount) {
//   //     alert(
//   //       "You have enough points to buy this product. Redirecting to download PDF..."
//   //     );
//   //     const response_pointsded = await API.patch("/products", {
//   //       points: product.discountAmount,
//   //       userId: userId,
//   //     });
//   //     if (response_pointsded.status === "success") {
//   //       console.log("Hi");
//   //     }
//   //     globalPoints_Products -= product.discountAmount;
//   //     console.log(response_pointsded);
//   //     dispatch(setPoints(response_pointsded.data.newpoints));
//   //     window.open(product.bookLink, "_blank");
//   //   }
//   // };

//   // PDF download handler
//   const handleBuy = async (product) => {
//     if (globalPoints_Products < product.discountAmount) {
//       const result = window.confirm(
//         "You don't have enough points to buy this product. Do you want to play games and add more points?"
//       );
//       if (result) {
//         navigate("/DashBoardPage");
//       }
//       return;
//     }

//     try {
//       // Deduct points from backend
//       const response_pointsded = await API.patch("/products", {
//         points: product.discountAmount,
//         userId: userId,
//       });

//       if (response_pointsded.data.status === "success") {
//         // Update Redux points with backend response
//         dispatch(setPoints(response_pointsded.data.newpoints));

//         alert("✅ Purchase successful! Redirecting to download PDF...");
//         window.open(product.bookLink, "_blank");
//       } else {
//         alert("❌ Failed to deduct points. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error while deducting points:", error);
//       alert("Something went wrong during purchase.");
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>🛒 Products Section</title>
//       </Helmet>
//       <h3>Welcome to Products Section</h3>
//       {productsSuccess && (
//         <>
//           <h3>Products are listed below</h3>
//           <h3>Points:{globalPoints_Products}</h3>
//           {productz.map((product, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <h3>{product.name}</h3>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 style={{ width: "100px", height: "100px" }}
//               />
//               <h3>Rating: {product.rating}⭐</h3>
//               <h3>Discounted Amount: {product.discountAmount}</h3>
//               <h3 style={{ textDecoration: "line-through", color: "grey" }}>
//                 Amount: {product.Amount}
//               </h3>

//               {/* Buy button triggers PDF download */}
//               <button onClick={() => handleBuy(product)}>
//                 Buy / Download PDF
//               </button>
//             </div>
//           ))}
//         </>
//       )}
//       {productsFailure && <h1>Error fetching the products data.</h1>}
//     </>
//   );
// };

// export default ProductsSection;

import API from "../api/axios";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPoints, setPoints } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./ProductsSection.css"; // 👈 import the CSS file

const ProductsSection = () => {
  const [productz, setProductz] = useState([]);
  const [productsFailure, setProductsFailure] = useState(false);
  const [productsSuccess, setProductsSuccess] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let globalPoints_Products = useSelector(selectPoints);
  const userId = "68955900ea39ddff800e24ba";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products/");
        dispatch(setPoints(response.data.points));
        setProductsSuccess(true);
        setProductz(response.data.data);
        console.log("Products fetched successfully:", response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsFailure(true);
      }
    };
    fetchProducts();
  }, [dispatch, userId]);

  const handleBuy = async (product) => {
    if (globalPoints_Products < product.discountAmount) {
      const result = window.confirm(
        "You don't have enough points to buy this product. Do you want to play games and add more points?"
      );
      if (result) {
        navigate("/DashBoardPage");
      }
      return;
    }

    try {
      const response_pointsded = await API.patch("/products", {
        points: product.discountAmount,
        userId: userId,
      });

      if (response_pointsded.data.status === "success") {
        dispatch(setPoints(response_pointsded.data.newpoints));
        alert("✅ Purchase successful! Redirecting to download PDF...");
        window.open(product.bookLink, "_blank");
      } else {
        alert("❌ Failed to deduct points. Please try again.");
      }
    } catch (error) {
      console.error("Error while deducting points:", error);
      alert("Something went wrong during purchase.");
    }
  };

  return (
    <>
      <Helmet>
        <title>🛒 Products Section</title>
      </Helmet>
      <div className="products-section">
        <h3 className="section-title">Welcome to Products Section</h3>
        {productsSuccess && (
          <>
            <h3 className="sub-title">Products are listed below</h3>
            <h3 className="points-display">
              Your Points: {globalPoints_Products}
            </h3>
            <div className="products-grid">
              {productz.map((product, index) => (
                <div key={index} className="product-card">
                  <h3 className="product-name">{product.name}</h3>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <p className="product-rating">⭐ Rating: {product.rating}</p>
                  <p className="product-discount">
                    Discounted Price: {product.discountAmount}
                  </p>
                  <p className="product-amount">
                    <span className="strike-text">
                      Original: {product.Amount}
                    </span>
                  </p>
                  <button
                    className="buy-button"
                    onClick={() => handleBuy(product)}
                  >
                    Buy / Download PDF
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {productsFailure && (
          <h1 className="error-message">Error fetching the products data.</h1>
        )}
      </div>
    </>
  );
};

export default ProductsSection;
