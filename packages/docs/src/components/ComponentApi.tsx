import React from 'react';
import ImportApi from './ImportApi';
import PropTable from './PropTable';

type Props = {
  name?: string;
  displayName?: string;
  importName?: string;
};

const ComponentAPI = ({ importName, name, displayName }: Props) => (
  <>
    {(displayName || name) && <h3>{displayName || name}</h3>}
    <div>{importName && <ImportApi name={importName} />}</div>
    {name && <PropTable name={name} />}
  </>
);

export default ComponentAPI;
