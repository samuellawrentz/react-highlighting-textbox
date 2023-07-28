import React from 'react';
import HighlightInputBox from './index';

export default {
  title: 'Hightlight Inputbox',
  component: HighlightInputBox,
};

const Template = (args) => <HighlightInputBox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  word: 'test',
  triggerOn: 'change',
  value: 'This is a test',
  onChange: (value) => console.log(value),
};
