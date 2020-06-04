import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: '300px',
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  details: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const TopDuties = (props) => {
  const { employePayrolls, className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const colors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.black,
    'green',
    'yellow',
    'blue',
    'brown',
  ];

  const getGroupedPayrollData = (arr, groupBy) => {
    // Calculate total duty count
    const dutiesCount = arr.filter((x) => x[groupBy] !== 'None').length;

    // Calculate the sums and group data
    const reduced = arr
      .filter((x) => x[groupBy] !== 'None')
      .reduce(function (m, d) {
        if (!m[d[groupBy]]) {
          m[d[groupBy]] = { ...d, count: 1 };
          return m;
        }
        m[d[groupBy]].count += 1;
        return m;
      }, {});

    // Create new array from grouped data
    const result = Object.keys(reduced).map(function (k) {
      const item = reduced[k];
      return {
        ...item,
        percentage: ((item.count / dutiesCount) * 100).toFixed(2),
      };
    });

    return result.sort((a, b) => (a.percentage > b.percentage ? -1 : 1));
  };

  const payrollDuties = getGroupedPayrollData(employePayrolls, 'duty');

  const data = {
    datasets: [
      {
        data: payrollDuties.map((item) => item.percentage),
        backgroundColor: colors,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
      },
    ],
    labels: payrollDuties.map((item) => item.duty),
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 50,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
    },
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Top Duties" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {payrollDuties.map((pay, key) => (
            <div className={classes.details} key={pay.duty}>
              <Typography variant="body1">{pay.duty}</Typography>
              <Typography style={{ color: colors[key] }} variant="h6">
                {pay.percentage}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

TopDuties.propTypes = {
  className: PropTypes.string,
};

export default TopDuties;
