import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import palette from '../../../../theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const MonthlyAmount = (props) => {
  const { employePayrolls, payroll, className, ...rest } = props;
  const classes = useStyles();

  const convertStringToDateFormat = (date) => {
    return moment(new Date(date.substring(date.length - 4) + '-' + date.substring(0, 1) + '-1')).format('MMMM yyyy');
  };

  const getGroupedPayrollData = (arr, groupBy, whitelist) => {
    // Calculate the sums and group data
    const reduced = arr
      .sort((a, b) => (a[groupBy] > b[groupBy] ? 1 : -1))
      .reduce(function (m, d) {
        if (!m[d[groupBy]]) {
          m[d[groupBy]] = { ...d };
          return m;
        }
        whitelist.forEach(function (key) {
          m[d[groupBy]][key] += d[key];
        });
        return m;
      }, {});

    // Create new array from grouped data
    const result = Object.keys(reduced).map(function (k) {
      const item = reduced[k];
      const itemSum = whitelist.reduce(function (m, key) {
        m[key] = item[key];
        return m;
      }, {});
      return {
        ...item,
        ...itemSum,
      };
    });

    return result;
  };

  const monthlyPayroll = payroll
    .sort((a, b) => (a.month > b.month ? 1 : -1))
    .map((item) => item.month)
    .filter((value, index, self) => self.indexOf(value) === index);

  const payrollData = getGroupedPayrollData(employePayrolls, 'month', ['amount']);

  const data = {
    labels: monthlyPayroll.map(convertStringToDateFormat),
    datasets: [
      {
        backgroundColor: palette.primary.main,
        data: payrollData.map((item) => item.amount.toFixed(2)),
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: { display: false },
    cornerRadius: 50,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: palette.divider,
      backgroundColor: palette.white,
      titleFontColor: palette.text.primary,
      bodyFontColor: palette.text.secondary,
      footerFontColor: palette.text.secondary,
    },
    layout: { padding: 0 },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: palette.divider,
          },
        },
      ],
    },
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Total Payment ($)" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

MonthlyAmount.propTypes = {
  className: PropTypes.string,
};

export default MonthlyAmount;
