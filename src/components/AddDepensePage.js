import React from 'react';
import { connect } from 'react-redux';
import { startAddDepense } from '../actions/depenses';
import DepenseForm from './DepenseForm';

export class AddDepensePage extends React.Component {
  onSubmit = (depense) => {
    this.props.startAddDepense(depense);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Depense</h1>
          </div>
        </div>
        <div className="content-container">
          <DepenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddDepense: (depense) => dispatch(startAddDepense(depense)),
});

export default connect(undefined, mapDispatchToProps)(AddDepensePage);
