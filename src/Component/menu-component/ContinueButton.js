import React from 'react';

const ContinueButton = (props) => {

        return(
            props.selectedItemsLength > 0 ?
            (<div className="continuebuttonDiv">
                <button className="btn btn-success" onClick={props.onContinue}>
                    Continue
                </button>
            </div>)
            : ""
        )
}
export default ContinueButton;