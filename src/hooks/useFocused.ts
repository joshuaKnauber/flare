import { useEffect, useState } from "react";

const useFocused = () => {
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleFocus = () => {
      setFocused(document.hasFocus());
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleFocus);
    };
  }, []);

  return focused;
};

export default useFocused;
