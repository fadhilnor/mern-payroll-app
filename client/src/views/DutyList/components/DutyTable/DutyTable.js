import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import { addDuty } from '../../../../services/dutyServices';

const DutyTable = (props) => {
  const { duties } = props;
  const dispatch = useDispatch();
  let [duty, setDuty] = useState(duties);

  useEffect(() => {
    setDuty(duties);
  }, [duties]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Duty', field: 'duty', width: 60, editable: 'onAdd' },
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
  };

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={duty}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            dispatch(addDuty(newData))
              .then((data) => {
                setDuty([...duty, data]);
              })
              .catch(() => reject())
              .then(() => resolve());
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // dispatch(updatePosition(newData))
            //   .then((updatedPosition) => {
            //     const data = [...positions];
            //     data[data.indexOf(oldData)] = updatedPosition;
            //     setPositions(data);
            //   })
            //   .catch(() => reject())
            //   .then(() => resolve());
          }),
      }}
    />
  );
};

DutyTable.propTypes = {
  duty: PropTypes.array,
};

export default DutyTable;
