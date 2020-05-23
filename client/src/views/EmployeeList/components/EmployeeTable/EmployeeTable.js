import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import { addEmployee } from '../../../../services/employeeServices';

const EmployeeTable = (props) => {
  const { employee, position } = props;
  const dispatch = useDispatch();
  let [employees, setEmployees] = useState(employee);
  const positionLookup = position.reduce((obj, item) => Object.assign(obj, { [item.position]: item.position }), {});

  useEffect(() => {
    setEmployees(employee);
  }, [employee]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Employee Id', field: 'empId', width: 30, editable: 'never' },
      { title: 'First Name', field: 'firstName', width: 100 },
      { title: 'Last Name', field: 'lastName', width: 100 },
      { title: 'Position', field: 'position', width: 60, lookup: positionLookup },
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
      data={employees}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            dispatch(addEmployee(newData))
              .then((data) => {
                setEmployees([...employees, data]);
              })
              .catch(() => reject())
              .then(() => resolve());
          }),
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {}),
      }}
    />
  );
};

EmployeeTable.propTypes = {
  employee: PropTypes.array,
};

export default EmployeeTable;
