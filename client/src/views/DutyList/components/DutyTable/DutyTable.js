import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import { addDuty, updateDuty } from '../../../../services/dutyServices';

const DutyTable = (props) => {
  const { duties, user } = props;
  const dispatch = useDispatch();
  let [duty, setDuty] = useState(duties);

  useEffect(() => {
    setDuty(duties);
  }, [duties]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Duty', field: 'duty', width: 60, editable: 'onAdd' },
      { title: 'Description', field: 'description', width: 250 },
      { title: 'Rate per day', field: 'rate', width: 100, type: 'numeric' },
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
            if (user.isDemoUser) {
              setDuty([...duty, newData]);
              resolve();
            } else {
              dispatch(addDuty(newData))
                .then((data) => {
                  setDuty([...duty, data]);
                })
                .catch(() => reject())
                .then(() => resolve());
            }
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            if (user.isDemoUser) {
              const dataUpdate = [...duty];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setDuty([...dataUpdate]);
              resolve();
            } else {
              dispatch(updateDuty(newData))
                .then((updatedDuty) => {
                  const data = [...duty];
                  data[data.indexOf(oldData)] = updatedDuty;
                  setDuty(data);
                })
                .catch(() => reject())
                .then(() => resolve());
            }
          }),
      }}
    />
  );
};

DutyTable.propTypes = {
  duty: PropTypes.array,
};

export default DutyTable;
