import React, {useState} from 'react';
import {View, Text, Alert, Button} from 'react-native';
import {TextInput, List, IconButton, Colors} from 'react-native-paper';
import {Formik} from 'formik';
import style from '@style/order.form';
import {subOrderFormSchema} from '@validation/order.form';
import {FormInputError} from '@helper/input.error';
import Loader from '@helper/loader';
// Later to remove
import {orderLabelGrp, utilLabelGrp} from '@label';
import {
  useCreateDetailMutation,
  useUpdateDetailMutation,
  useDeleteDetailMutation,
} from '@service/order';

export default ({orderId, list}) => {
  const [lists, setLists] = useState(list);
  const [newForm, setNewForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [createDetail] = useCreateDetailMutation();
  const [updateDetail] = useUpdateDetailMutation();
  const [deleteDetail] = useDeleteDetailMutation();

  const displayEditForm = id => {
    setLists(() =>
      lists.map(obj => {
        let isEditted = false;
        if (obj.id === id) {
          isEditted = obj.isEditted ? !obj.isEditted : true;
        }
        return {...obj, ...{isEditted: isEditted}};
      }),
    );
  };

  const handleDelete = async ({order_id, id}) => {
    const {data: deleteData} = await deleteDetail({order_id, id});
    if (deleteData?.status === 'success') {
      setLists(() =>
        lists.filter(obj => {
          if (obj.id !== id) {
            return obj;
          }
        }),
      );
    }
    if (deleteData?.status === 'error') {
      Alert.alert(deleteData?.msg);
    }
  };

  const handelCreate = async obj => {
    setIsSaving(prev => !prev);
    const {data: createData} = await createDetail({
      ...obj,
      ...{order_id: orderId.toString()},
    });

    if (createData?.status === 'success') {
      const prev = lists;
      const data = [
        ...prev,
        {
          id: createData.data.id,
          name: obj.name,
          color: obj.color,
          size: obj.size,
          quantity: obj.quantity.toString(),
          sub_total_price: obj.sub_total_price.toString(),
          isEditted: false,
        },
      ];
      setLists(data);
      setNewForm(pre => !pre);
    }
    if (createData?.status === 'error') {
      Alert.alert(createData?.msg);
    }
    setIsSaving(prev => !prev);
  };

  const handleUpdate = async newObj => {
    setIsSaving(prev => !prev);
    const {data: updateData} = await updateDetail({
      ...newObj,
      ...{order_id: orderId.toString()},
    });
    if (updateData?.status === 'success') {
      setLists(() =>
        lists.map(obj => {
          if (obj.id === newObj.id) {
            return {
              ...obj,
              ...{...newObj, ...{isEditted: false}},
            };
          }
          return obj;
        }),
      );
    }
    if (updateData?.status === 'error') {
      Alert.alert(updateData?.msg);
    }
    setIsSaving(prev => !prev);
  };

  return (
    <>
      {lists.map(item => {
        return (
          <List.Item
            key={item.id}
            title={`${item.name}`}
            description={() => (
              <View>
                <Text style={style.labelColor}>
                  {orderLabelGrp.subOrderSize}: {item.size} -{' '}
                  {orderLabelGrp.subOrderColor}: {item.color}
                </Text>
                <Text style={style.labelColor}>
                  {orderLabelGrp.subOrderQuantity}: {item.quantity}
                </Text>
                <Text style={style.labelColor}>
                  {orderLabelGrp.subOrderSubTotalAmount}: {item.sub_total_price}
                </Text>
                <View style={style.detailButtonWrapper}>
                  <IconButton
                    icon="square-edit-outline"
                    color={Colors.orange700}
                    size={26}
                    onPress={() => displayEditForm(item.id)}
                  />
                  <IconButton
                    icon="minus-circle"
                    color={Colors.red700}
                    size={26}
                    onPress={() =>
                      handleDelete({order_id: orderId, id: item.id})
                    }
                  />
                </View>
                {item.isEditted && (
                  <DetailForm
                    onSave={handleUpdate}
                    isSaving={isSaving}
                    {...item}
                  />
                )}
              </View>
            )}
            left={props => <List.Icon {...props} icon="square" />}
          />
        );
      })}
      <IconButton
        icon={newForm ? 'close-circle' : 'plus-circle'}
        color={Colors.green700}
        size={30}
        onPress={() => setNewForm(prev => !prev)}
      />
      {newForm && (
        <DetailForm
          isSaving={isSaving}
          onSave={handelCreate}
          {...{
            id: null,
            name: 'erte',
            color: 'wtwt',
            size: 'twt',
            quantity: '1',
            sub_total_price: '2',
          }}
        />
      )}
    </>
  );
};

const DetailForm = ({
  id,
  name,
  color,
  size,
  quantity,
  sub_total_price,
  onSave,
  isSaving,
}) => {
  return (
    <Formik
      validationSchema={subOrderFormSchema}
      initialValues={{
        id: id ? id : null,
        name,
        size,
        color,
        quantity: quantity.toString(),
        sub_total_price: sub_total_price.toString(),
      }}
      validateOnBlur={false}
      onSubmit={values => onSave(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        dirty,
        errors,
      }) => {
        return (
          <>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                style={style.whiteBg}
                label={orderLabelGrp.subOrderName}
                placeholder={orderLabelGrp.subOrderName}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <FormInputError msg={errors.name} />
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.subOrderSize}
                placeholder={orderLabelGrp.subOrderSize}
                style={style.whiteBg}
                onChangeText={handleChange('size')}
                onBlur={handleBlur('size')}
                value={values.size}
              />
              <FormInputError msg={errors.size} />
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.subOrderColor}
                placeholder={orderLabelGrp.subOrderColor}
                style={style.whiteBg}
                onChangeText={handleChange('color')}
                onBlur={handleBlur('color')}
                value={values.color}
              />
              <FormInputError msg={errors.color} />
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.subOrderQuantity}
                placeholder={orderLabelGrp.subOrderQuantity}
                style={style.whiteBg}
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                value={values.quantity}
              />
              <FormInputError msg={errors.quantity} />
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.subOrderSubTotalAmount}
                placeholder={orderLabelGrp.subOrderSubTotalAmount}
                style={style.whiteBg}
                onChangeText={handleChange('sub_total_price')}
                onBlur={handleBlur('sub_total_price')}
                value={values.sub_total_price}
              />
              <FormInputError msg={errors.sub_total_price} />
            </View>
            <View style={style.inputWrapper}>
              {isSaving ? (
                <Loader msg={utilLabelGrp.isSaving} />
              ) : (
                <Button
                  // disabled={!isValid || !dirty}
                  icon="content-save"
                  color={Colors.blueA700}
                  size={30}
                  title={orderLabelGrp.saveOrderDetail}
                  onPress={handleSubmit}
                />
              )}
            </View>
          </>
        );
      }}
    </Formik>
  );
};
