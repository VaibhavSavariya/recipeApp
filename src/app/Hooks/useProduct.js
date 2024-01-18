import { useState } from "react";

const useProduct = () => {
  const [me, setMe] = useState("");
  const value = { me, setMe };

  return value;
};

export default useProduct;
