import React, { useRef, useEffect } from "react";

export function InfiniteScroll(props) {
  const cardsDivRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (cardsDivRef.current) {
        const scrollTop = cardsDivRef.current.scrollTop;
        const scrollHeight = cardsDivRef.current.scrollHeight;
        const clientHeight = cardsDivRef.current.clientHeight;
        if (scrollTop + clientHeight > (3 / 4) * scrollHeight) {
          props.callback();
        }
      }
    }

    cardsDivRef.current &&
      cardsDivRef.current.addEventListener("scroll", onScroll);

    return () => {
      cardsDivRef.current &&
        cardsDivRef.current.removeEventListener("scroll", onScroll);
    };
  }, [cardsDivRef.current, props.callback]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "auto",
        height: "100%",
        width: "100%",
      }}
      ref={cardsDivRef}
    >
      <div style={{ position: "absolute" }}>
        {props.children}
        {props.isLoading && <>Loading ...</>}
      </div>
    </div>
  );
}
