// const VideosSection = () => {
//   return (
//     <div>
//       <h1>Videos Section</h1>
//       <p>
//         Here you can find various videos related to mental health and focus.
//       </p>
//       {/* <a href="https://youtu.be/rkZl2gsLUp4?si=LaP74D-cXyn5YK6u">
//                 <img src="https://img.youtube.com/vi/rkZl2gsLUp4/hqdefault.jpg"/>
//             </a> */}
//       {/* Add video content or links here */}
//       <div
//         style={{
//           position: "relative",
//           paddingBottom: "56.25%",
//           height: 0,
//           overflow: "hidden",
//           maxWidth: "100%",
//         }}
//       >
//         <iframe
//           src="https://www.youtube.com/embed/rkZl2gsLUp4"
//           title="Mindfulness Video"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             borderRadius: "8px",
//           }}
//         ></iframe>
//       </div>
//     </div>
//   );
// };
// export default VideosSection;

// import { videos } from "../data/VideosData.js";
// const VideosSection = () => {
//   return (
//     <article>
//       <h1>Videos Section</h1>
//       <p>
//         Here you can find various videos related to mental health and focus.
//       </p>
//       {/* <a href="https://youtu.be/rkZl2gsLUp4?si=LaP74D-cXyn5YK6u">
//                 <img src="https://img.youtube.com/vi/rkZl2gsLUp4/hqdefault.jpg"/>
//             </a> */}
//       {/* Add video content or links here */}
//       {videos.map((video) => {
//         return (
//           <div
//             style={{
//               position: "relative",
//               paddingBottom: "56.25%",
//               height: 0,
//               overflow: "hidden",
//               maxWidth: "100%",
//             }}
//             key={video.videoId}
//           >
//             <iframe
//               src={`https://www.youtube.com/embed/${video.videoId}`}
//               title="Mindfulness Video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "8px",
//               }}
//             ></iframe>
//           </div>
//         );
//       })}
//     </article>
//   );
// };
// export default VideosSection;

import { useState, useMemo } from "react";
import { videos } from "../data/VideosData.js";
import { Helmet } from "react-helmet-async";
const VideosSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //useMemo when again restarting the work.
  const VideoFilter = useMemo(
    () =>
      videos.filter((video) =>
        video.tags.some(
          //.some means atleast one string if it has tags["mindfulness", "mental health", "focus"] it should atleast match one
          (tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm]
  );
  return (
    <>
      <Helmet>
        <title>📹 Videos Section</title>
      </Helmet>
      <article>
        <h1>Videos Section</h1>
        <p>
          Here you can find various videos related to mental health and focus.
        </p>
        {/* <a href="https://youtu.be/rkZl2gsLUp4?si=LaP74D-cXyn5YK6u">
                <img src="https://img.youtube.com/vi/rkZl2gsLUp4/hqdefault.jpg"/>
            </a> */}
        {/* Add video content or links here */}
        <input
          type="text"
          placeholder="Search for post based on your current mood"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {VideoFilter.map((video) => {
          return (
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                maxWidth: "100%",
              }}
              key={video.videoId}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title="Mindfulness Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></iframe>
            </div>
          );
        })}
      </article>
    </>
  );
};
export default VideosSection;
