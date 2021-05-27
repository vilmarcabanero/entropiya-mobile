import styled from 'styled-components';
import {Picker} from '@react-native-community/picker';
import {View, Text, TextInput, Button} from 'react-native';

export const Container = styled(View)``;

export const PickerContainer = styled(View)`
  margin: 10px;
`;

export const StyledPicker = styled(Picker)`
  width: 250px;
`;

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 40px;
`;

export const Label = styled(Text)`
  font-size: 14px;
  color: gray;
`;

export const Input = styled(TextInput)`
  height: 50px;
  margin: 12px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgba(38, 38, 38, 0.05);
`;

export const SubmitButton = styled(Button)``;

// color="#841584"
