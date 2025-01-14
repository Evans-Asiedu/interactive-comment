import { useEffect } from "react";

export default function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(event) {
      if (event.target === document.documentElement || event.target === document.body) {
        // This is a click on the scrollbar
        return
      }
      if (!ref.current || ref.current.contains(event.target)) {
        // This is a click inside of ref
        return;
      }

      handler(event);
    }

    window.addEventListener("mousedown", listener);
    window.addEventListener("touchstart", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}
