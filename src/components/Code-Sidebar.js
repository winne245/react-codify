import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  sidebarList: {
    marginTop: 40,
    width: 70,
    border: '1px solid #595959',
  },
  item: {
    height: 40,
    width: 30,
    marginLeft: 3,
  },

}));

export default function SidebarItems() {
  const classes = useStyles();

  return (
    <List className={classes.sidebarList}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon className={classes.item} />
        </ListItemIcon>
        {/* <ListItemText primary="" /> */}
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon className={classes.item} />
        </ListItemIcon>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon className={classes.item} />
        </ListItemIcon>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon className={classes.item} />
        </ListItemIcon>
      </ListItem>
    </List>
  );
}