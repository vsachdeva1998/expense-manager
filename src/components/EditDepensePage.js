import React from 'react';
import { connect } from 'react-redux';
import { startEditDepense, startRemoveDepense } from '../actions/depenses';
import DepenseForm from './DepenseForm';

export class EditDepensePage extends React.Component {
  onSubmit = (depense) => {
    this.props.startEditDepense(this.props.depense.id, depense);
    this.props.history.push('/dashboard');
  };
  onRemove = () => {
    this.props.startRemoveDepense(this.props.depense.id);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Depense</h1>
          </div>
        </div>
        <div className="content-container">
          <DepenseForm depense={this.props.depense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove Depense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  depense: state.depenses.find(
    (depense) => depense.id === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditDepense: (id, depense) => dispatch(startEditDepense(id, depense)),
  startRemoveDepense: (id) => dispatch(startRemoveDepense({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDepensePage);
