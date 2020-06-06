import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

import { updatePayrollEmployee } from '../../../../services/payrollEmployeeServices';

const EmployeePayrollTable = (props) => {
  const { payroll, duties, positions, employee, user, onHandleToggle } = props;
  const dispatch = useDispatch();
  const { payrollEmployees, empId, payId } = useSelector((state) => state.payrollEmployees);
  let [employeePayrolls, setEmployeePayroll] = useState(payrollEmployees);
  const employeePosition = employee.find((o) => o.empId === empId);
  const employeePayroll = payroll.find((o) => o.payId === payId);
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setEmployeePayroll(payrollEmployees);
    setTotalAmount(calculateTotalAmount(payrollEmployees));
  }, [payrollEmployees]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Day', field: 'day', editable: 'never' },
      {
        title: 'Duty',
        field: 'duty',
        editComponent: (props) => (
          <Select
            value={props.value}
            onChange={(e) => {
              var data = { ...props.rowData };
              data.duty = e.target.value;
              data.amount = (getRateFromDuty(e.target.value) * getRateFromPosition()).toFixed(2);
              props.onRowDataChange(data);
            }}
          >
            {duties.map((e, key) => (
              <MenuItem value={e.duty} key={key}>
                {e.duty}
              </MenuItem>
            ))}
          </Select>
        ),
      },
      {
        title: 'Amount ($)',
        field: 'amount',
        editable: 'never',
        cellStyle: {
          textAllign: 'left',
          fontWeight: 'bold',
        },
      },
      {
        title: 'Last updated',
        field: 'updatedAt',
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

  const getRateFromDuty = (duty) => {
    let obj = duties.find((o) => o.duty === duty);
    return obj.rate;
  };

  const getRateFromPosition = () => {
    let obj = positions.find((o) => o.position === employeePosition.position);
    return obj.rate;
  };

  const calculateTotalAmount = (arr) => {
    return (
      arr
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next, 0)
        .toFixed(2) || 0
    );
  };

  const convertStringToDateFormat = (date) => {
    return moment(new Date(date.substring(date.length - 4) + '-' + date.substring(0, 1) + '-1')).format('MMMM yyyy');
  };

  let payrollTitle = '';
  if (employeePosition !== undefined && employeePayroll !== undefined) {
    payrollTitle =
      convertStringToDateFormat(employeePayroll.month) +
      ` - ${employeePosition.firstName} ${employeePosition.lastName} (${employeePosition.empId})`;
  }

  return (
    <MaterialTable
      title={payrollTitle}
      columns={state.columns}
      data={employeePayrolls}
      onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
      options={{
        exportButton: true,
        exportAllData: true,
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white', fontSize: 15, fontWeight: 'bold', textAllign: 'left' },
        cellStyle: { padding: '0.1em', textAllign: 'center' },
        pageSize: 20,
        rowStyle: (rowData) => ({
          backgroundColor: selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
        }),
      }}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '10px 10px' }}>
              <Button color="primary" variant="outlined" onClick={handleOpen}>
                Back
              </Button>
              <Button style={{ marginLeft: '5px', fontWeight: 'bold' }} color="secondary" variant="outlined">
                Total Amount: $ {totalAmount}
              </Button>
            </div>
          </div>
        ),
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            if (user.isDemoUser) {
              newData.amount = newData.amount - 0;
              const dataUpdate = [...employeePayrolls];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setEmployeePayroll(dataUpdate);
              setTotalAmount(calculateTotalAmount(dataUpdate));
              resolve();
            } else {
              dispatch(updatePayrollEmployee(newData))
                .then((updatedDuty) => {
                  const data = [...employeePayrolls];
                  data[data.indexOf(oldData)] = updatedDuty;
                  setEmployeePayroll(data);
                  setTotalAmount(calculateTotalAmount(data));
                })
                .catch(() => reject())
                .then(() => resolve());
            }
          }),
      }}
    />
  );
};

EmployeePayrollTable.propTypes = {
  employeePayrolls: PropTypes.array,
};

export default EmployeePayrollTable;
