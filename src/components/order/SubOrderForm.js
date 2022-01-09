/* eslint-disable no-alert */
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
// Later to remove
import {orderLabelGrp} from '@util/order.label';

export default props => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sub_total_price, setSubTotalPrice] = useState('');

  return (
    <>
      <TextInput
        mode="outlined"
        label="Name"
        placeholder="Name"
        name="name"
        onChangeText={val => setName(prev => val)}
        value={name}
      />

      <TextInput
        mode="outlined"
        label="Size"
        placeholder="Size"
        name="size"
        onChangeText={val => setSize(prev => val)}
        value={size}
      />

      <TextInput
        mode="outlined"
        label="Color"
        placeholder="Color"
        name="color"
        onChangeText={val => setSize(prev => val)}
        value={color}
      />

      <TextInput
        mode="outlined"
        label="Quantity"
        placeholder="Quantity"
        name="quantity"
        onChangeText={val => setSize(prev => val)}
        value={quantity}
      />

      <TextInput
        mode="outlined"
        label="Sub Total Price"
        placeholder="Sub Total Price"
        name="sub_total_price"
        onChangeText={val => setSize(prev => val)}
        value={sub_total_price}
      />
    </>
  );
};
