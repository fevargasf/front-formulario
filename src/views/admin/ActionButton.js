import React,{useRef} from "react";
import Button from "@material-ui/core/Button";
import ReactToPrint from "react-to-print";



export const ActionButton = ()=> {
    const ActionButtonProps = {
        componentToPrint: useRef(null)
      };
  const { componentToPrint } = ActionButtonProps;

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button id={"print"} variant="contained" color="primary">
            {" "}
            {"Print"}{" "}
          </Button>
        )}
        content={() => componentToPrint.current}
      />
    </>
  );
};
