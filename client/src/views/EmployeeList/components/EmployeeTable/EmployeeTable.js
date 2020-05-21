import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

const EmployeeTable = (props) => {
  const { employee } = props;
  const dispatch = useDispatch();
  let [employees, setEmployees] = useState(employee);

  useEffect(() => {
    setEmployees(employee);
  }, [employee]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Employee Id', field: 'empId', width: 60, editable: 'onAdd' },
      { title: 'Name', field: 'name', width: 250 },
      { title: 'Position', field: 'position', width: 60 },
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
        onRowAdd: (newData) => new Promise((resolve, reject) => {}),
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {}),
      }}
    />
  );
};

EmployeeTable.propTypes = {
  employee: PropTypes.array,
};

export default EmployeeTable;
