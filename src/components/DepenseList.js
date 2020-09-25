import React from 'react';
import { connect } from 'react-redux';
import DepenseListItem from './DepenseListItem';
import selectDepenses from '../selectors/depenses';

export const DepenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-small-screen">Depenses</div>
      <div className="show-big-screen">Depense</div>
      <div className="show-big-screen">Amount</div>
    </div>
    <div className="list-body">
      {props.depenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No depenses</span>
        </div>
      ) : (
        props.depenses.map((depense) => (
          <DepenseListItem key={depense.id} {...depense} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  depenses: selectDepenses(state.depenses, state.filters),
});

export default connect(mapStateToProps)(DepenseList);
