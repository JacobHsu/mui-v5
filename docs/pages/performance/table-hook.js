import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { NoSsr } from '@mui/base/NoSsr';

const createComponent = (defaultComponent) => {
  const useStyles = makeStyles({
    root: {
      background: 'pink',
    },
  });

  const MyComponent = React.forwardRef(function MyComponent(props, ref) {
    const { component: Component = defaultComponent, ...other } = props;
    const classes = useStyles();

    return <Component ref={ref} {...other} className={classes.root} />;
  });

  MyComponent.propTypes = {
    component: PropTypes.elementType,
  };

  return MyComponent;
};

const Table = createComponent('table');
const TableHead = createComponent('thead');
const TableRow = createComponent('tr');
const TableCell = createComponent('td');
const TableBody = createComponent('tbody');

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(100)).map(() => data);

export default function TableHook() {
  return (
    <NoSsr defer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </NoSsr>
  );
}
