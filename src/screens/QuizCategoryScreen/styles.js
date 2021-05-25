import styled from 'styled-components';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: steelblue;
`;

export const Icon = styled(FontAwesome)`
  margin: 2px;
`;
