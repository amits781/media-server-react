import React from "react";
import { useScrollTrigger } from "@material-ui/core";

const ScrollHandler = (props) => {
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined
  });
  // const textAlign = props.addInfo.isMenu? "right" : "left";
  // const flex = props.addInfo.isMenu? "1" : "1";
  return React.cloneElement(props.children, {
    style: {
      // flex: trigger ? "" : "0.2",
      // textAlign: textAlign,
      fontSize: trigger ? "20px" : "40px",
      transition: trigger ? "0.3s" : "0.5s",
    }
  }); 
};

const ScrollZoomText = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollZoomText;
