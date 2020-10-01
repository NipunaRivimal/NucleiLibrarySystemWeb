import { useRef, useEffect } from "react";

//check component mount first time, if first time return true else return false
const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default useIsMount;
