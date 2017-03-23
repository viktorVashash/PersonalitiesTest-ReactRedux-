import React from 'react';

export default function() {
  return(
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">All fields are required.</h4>
          </div>
          <div className="modal-body">
            <span className="modal-span">You must fill all fields.</span>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
}
