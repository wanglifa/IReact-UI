import {useEffect, useState} from "react";

const useUpdate = (dep: boolean, fn: () => void) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(x => x + 1)
  }, [dep])
  useEffect(() => {
    if (count > 1) {
      fn()
    }
  }, [count])
}

export default useUpdate;