import React from 'react';
import { func, instanceOf, string } from 'prop-types';
import { RowNode } from 'ag-grid-community';

const ButtonCellRender = ({ onEventRowClicked, node, text }) => {

  return (
    <button
      constraintTo="window"
      type='button'
      onClick={() => onEventRowClicked(node.data)}
    >
      {text}
    </button>
  );
};

ButtonCellRender.propTypes = {
  onEventRowClicked: func.isRequired,
  text: string.isRequired,
  node: instanceOf(RowNode).isRequired,
};

export default ButtonCellRender;
