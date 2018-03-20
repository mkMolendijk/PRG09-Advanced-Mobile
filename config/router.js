import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon} from 'native-base';

import Map from '../screens/Map';
import Locations from '../screens/Locations';

export const Tabs = TabNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: <Icon name='globe'/>,
            animationEnabled: true,
        },
    },
    Locations: {
        screen: Locations,
        navigationOptions: {
            tabBarLabel: 'Locations',
            tabBarIcon: <Icon name='list'/>,
            animationEnabled: true,
        },
    },
});