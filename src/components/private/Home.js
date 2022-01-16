import React, {useCallback, useState} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import style from '@style/private.home';
import {orderLabelGrp} from '@label';
import {useOrderCounterQuery} from '@service/order';

export default () => {
  const [counter, setCounter] = useState(0);
  const {data} = useOrderCounterQuery(counter);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={style.container}>
      <View style={style.counterWrapper}>
        <Text style={style.counterIndex}>{orderLabelGrp.totalOrderCount}</Text>
        <Text style={style.counterValue}>{data?.data?.totalCount}</Text>
      </View>

      <View style={style.counterWrapper}>
        <Text style={style.counterIndex}>
          {orderLabelGrp.orderedOrderCount}
        </Text>
        <Text style={style.counterValue}>{data?.data?.orderedCount}</Text>
      </View>

      <View style={style.counterWrapper}>
        <Text style={style.counterIndex}>
          {orderLabelGrp.deliveredOrderCount}
        </Text>
        <Text style={style.counterValue}>{data?.data?.deliveredCount}</Text>
      </View>

      <View style={style.counterWrapper}>
        <Text style={style.counterIndex}>
          {orderLabelGrp.completeOrderCount}
        </Text>
        <Text style={style.counterValue}>{data?.data?.completeCount}</Text>
      </View>
    </ScrollView>
  );
};
