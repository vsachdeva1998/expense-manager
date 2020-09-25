import React from 'react';
import DepenseList from './DepenseList';
import DepenseListFilters from './DepenseListFilters';
import DepensesSummary from './DepensesSummary';

const DepenseDashboardPage = () => (
  <div>
    <DepensesSummary />
    <DepenseListFilters />
    <DepenseList />
  </div>
);

export default DepenseDashboardPage;
