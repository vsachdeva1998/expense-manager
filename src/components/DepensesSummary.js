import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectDepenses from '../selectors/depenses';
import selectDepensesTotal from '../selectors/depenses-total';

export const DepensesSummary = ({ depenseCount, depensesTotal }) => {
  const depenseWord = depenseCount === 1 ? 'depense' : 'depenses';
  const formattedDepensesTotal = numeral(depensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{depenseCount}</span> {depenseWord} totalling{' '}
          <span>{formattedDepensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Depense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleDepenses = selectDepenses(state.depenses, state.filters);

  return {
    depenseCount: visibleDepenses.length,
    depensesTotal: selectDepensesTotal(visibleDepenses),
  };
};

export default connect(mapStateToProps)(DepensesSummary);
