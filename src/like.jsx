import { useState, useEffect } from "react";
import React from "react";
import "./like.css";
import axios from "axios";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Like = () => {
  const [likes, setLikeCount] = useState(0);

  const handleLikeClick = async () => {
    // console.log(likes);

    try {
      const response = await axios.post(
        "https://authen-server.vercel.app/api/increment-like",
        likes
      );
      // console.log(response.data.likes);
      if (response.status === 200) {
        setLikeCount(response.data.likes);

        toast.success("😍 Thank You for Your Like", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("🪲 There is a BUG in backend", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(
          "https://authen-server.vercel.app/api/like-count"
        );
        // console.log(response);
        const data = await response.json();
        setLikeCount(data.likes);
      } catch (error) {
        toast.error("🪲 There is a BUG in Getting Like-Count", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    };

    fetchLikeCount();
  }, []);

  return (
    <div className="container">
      <div className="like">Did You Like This?</div>
      <div className="likebtn">
        <button className="btn" onClick={handleLikeClick}>
          <span role="img" aria-label="like">
            👍
            <>{likes}</>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Like;
