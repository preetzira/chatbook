import React from 'react'

const InputGroup = (props) => {
  return <div class="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby={props.ariaLabel} aria-hidden="true">
          <div class={`modal-dialog modal-${props.size} modal-dialog-${props.position}`} role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id={props.ariaLabel}>{props.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {props.body}
              {props.footer ? props.footer:null}
            </div>
          </div>
        </div>
}

export default InputGroup
