import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import { addPosition, updatePosition } from '../../../../services/positionServices';

const PositionTable = (props) => {
  const { position, user } = props;
  const dispatch = useDispatch();
  let [positions, setPositions] = useState(position);

  useEffect(() => {
    setPositions(position);
  }, [position]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Position', field: 'position', width: 60, editable: 'onAdd' },
      { title: 'Description', field: 'description', width: 250 },
      { title: 'Rate multiplier', field: 'rate', width: 60, type: 'numeric' },
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
  };

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
            if (user.isDemoUser) {
              setPositions([...positions, newData]);
              resolve();
            } else {
              dispatch(addPosition(newData))
                .then((data) => {
                  setPositions([...positions, data]);
                })
                .catch(() => reject())
                .then(() => resolve());
            }
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            if (user.isDemoUser) {
              const dataUpdate = [...positions];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setPositions([...dataUpdate]);
              resolve();
            } else {
              dispatch(updatePosition(newData))
                .then((updatedPosition) => {
                  const data = [...positions];
                  data[data.indexOf(oldData)] = updatedPosition;
                  setPositions(data);
                })
                .catch(() => reject())
                .then(() => resolve());
            }
          }),
      }}
    />
  );
};

PositionTable.propTypes = {
  position: PropTypes.array,
};

export default PositionTable;
