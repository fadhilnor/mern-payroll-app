import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import { addPosition } from '../../../../services/positionServices';

const PositionTable = (props) => {
  const { position } = props;
  const dispatch = useDispatch();
  let [positions, setPositions] = useState(position);

  useEffect(() => {
    setPositions(position);
  }, [position]);

  const [state, setState] = useState({
    columns: [
      { title: 'Position', field: 'position', width: 60 },
      { title: 'Description', field: 'description', width: 300 },
      {
        title: 'Last updated',
        field: 'updatedAt',
        width: 40,
        editable: 'never',
        render: (rowData) => rowData && rowData.updatedAt && <p>{new Date(rowData.updatedAt).toDateString()}</p>,
        customSort: (a, b) => {
          var a1 = new Date(a.updatedAt).getTime();
          var b1 = new Date(b.updatedAt).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={positions}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            dispatch(addPosition(newData))
              .then((data) => {
                setPositions([...positions, data]);
              })
              .catch(() => reject())
              .then(() => resolve());
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

PositionTable.propTypes = {
  position: PropTypes.array,
};

export default PositionTable;
