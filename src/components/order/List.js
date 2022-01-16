import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import {List, FAB, Portal, Provider, Button} from 'react-native-paper';
import {formtDate} from '@helper/date';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from '@style/order.list';
import {useOrdersQuery} from '@service/order';
import Loader from '@helper/loader';

// Later to remove
import {orderLabelGrp, utilLabelGrp} from '@label';

const OrderItem = ({item, onPress}) => {
  return (
    <List.Item
      onPress={() => onPress(item.id)}
      title={`${item.customer_name} - ${item.customer_phone}`}
      description={() => (
        <View>
          <Text style={style.itemListColor}>
            {orderLabelGrp.orderedDate}:{' '}
            {item.ordered_at ? formtDate(item.ordered_at) : '-'}
          </Text>
          <Text style={style.itemListColor}>
            {orderLabelGrp.deliveredDate}:{' '}
            {item.delivered_at ? formtDate(item.delivered_at) : '-'}
          </Text>
          <Text style={style.itemListColor}>
            {orderLabelGrp.completeDate}:{' '}
            {item.complete_at ? formtDate(item.complete_at) : '-'}
          </Text>
          <Text style={style.itemListColor}>
            {orderLabelGrp.totalAmount}:{' '}
            {item.orderDetail.reduce(
              (sum, obj) => sum + obj.sub_total_price,
              0,
            )}
          </Text>
        </View>
      )}
      left={props => {
        props.color =
          item.status === 'DELIVERED'
            ? '#e2dc16'
            : item.status === 'COMPLETE'
            ? '#3eaf18'
            : '#d62424';
        return <List.Icon {...props} icon="square" />;
      }}
    />
  );
};

export default () => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const [status, setStatus] = useState('ORDERED');
  const [ipp, setIpp] = useState(15);
  const [counter, setCounter] = useState(1);
  const [page, setPage] = useState(1);
  // const [startDate, setStartDate] = useState(
  //   formtDate(new Date(), 'yyyy-MM-dd 00:00:00'),
  // );
  const [startDate, setStartDate] = useState('2019-01-01 00:00:00');

  const [endDate, setEndDate] = useState(
    formtDate(new Date(), 'yyyy-MM-dd 23:59:59'),
  );

  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const {data, isFetching} = useOrdersQuery({
    counter,
    page,
    status,
    ipp,
    startDate,
    endDate,
  });

  const hasMore = data?.meta?.hasMore ? data?.meta?.hasMore : false;

  useEffect(() => {
    if (params?.status) {
      setStatus(() => params.status);
    }
    if (params?.ipp) {
      setIpp(() => params.ipp);
    }
    if (params?.startDate) {
      setStartDate(() => params.startDate);
    }
    if (params?.endDate) {
      setEndDate(() => params.endDate);
    }
  }, [params]);

  const viewOrder = orderId => {
    navigation.navigate('OrderDetail', {id: orderId});
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  return (
    <Provider>
      <Portal>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={style.container}>
          <View style={style.searchButtonWrapper}>
            <Button
              icon="table-search"
              mode="text"
              onPress={() =>
                navigation.navigate('SearchForm', {
                  ipp,
                  status,
                  startDate,
                  endDate,
                })
              }>
              {orderLabelGrp.searchLabel}
            </Button>
          </View>
          {isFetching && <Loader msg={utilLabelGrp.isFetching} />}
          {data?.orders.map(item => (
            <OrderItem key={item.id} item={item} onPress={viewOrder} />
          ))}
          {data?.orders.length < 1 && (
            <Text style={style.noOrderFound}>
              {orderLabelGrp.noOrderFoundLabel}
            </Text>
          )}

          <View style={style.paginateWrapper}>
            {page > 1 && (
              <Button
                mode="contained"
                onPress={() => {
                  setPage(prev => prev - 1);
                }}>
                {orderLabelGrp.paginationPreviousLabel}
              </Button>
            )}
            {hasMore && (
              <Button
                mode="contained"
                style={style.paginationNextButton}
                onPress={() => {
                  if (hasMore) {
                    setPage(prev => prev + 1);
                  }
                }}>
                {orderLabelGrp.paginationNextLabel}
              </Button>
            )}
          </View>
        </ScrollView>

        <FAB.Group
          open={open}
          style={style.fabDesign}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'card-plus',
              label: `${orderLabelGrp.createNewOrder}`,
              onPress: () => {
                navigation.navigate('OrderCreate');
              },
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};
