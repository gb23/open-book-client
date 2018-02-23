import React from 'react';

const Loading = () => {
    return (
        <div className="fa-1x" style={{margin: "auto", width: "100px"}}>
          <i className="fa fa-spinner fa-spin"></i> <span className="avenir">Loading</span> <span className="blink1 avenir">.</span><span className="blink2 avenir">.</span><span className="blink3 avenir">.</span>
        </div>       
    );
}

export default Loading;