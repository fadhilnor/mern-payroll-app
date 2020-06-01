import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const EmployeePayrollTable = (props) => {
  const { duties, onHandleToggle } = props;
  const dispatch = useDispatch();
  const { payrollEmployees } = useSelector((state) => state.payrollEmployees);
  let [employeePayrolls, setEmployeePayroll] = useState(payrollEmployees);
  const dutiesLookup = duties.reduce((obj, item) => Object.assign(obj, { [item.duty]: item.duty }), {});

  useEffect(() => {
    setEmployeePayroll(payrollEmployees);
  }, [payrollEmployees]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Day', field: 'day', width: 30, editable: 'never' },
      { title: 'Duty', field: 'duty', width: 60, lookup: dutiesLookup },
      { title: 'Amount', field: 'amount', width: 60, type: 'numeric', editable: 'never' },
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

  const handleOpen = () => {
    onHandleToggle();
  };

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={employeePayrolls}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
        pageSize: 20,
      }}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '10px 10px' }}>
              <Button color="primary" variant="outlined" onClick={handleOpen}>
                Back
              </Button>
            </div>
          </div>
        ),
      }}
      editable={{
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {}),
      }}
    />
  );
};

EmployeePayrollTable.propTypes = {
  employeePayrolls: PropTypes.array,
};

export default EmployeePayrollTable;
