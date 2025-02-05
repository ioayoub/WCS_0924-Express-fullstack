import axios from "axios";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    axios
      .get("http://localhost:3310/v1/test", {
        withCredentials: true,
      })
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1> Hello </h1>
    </>
  );
}
