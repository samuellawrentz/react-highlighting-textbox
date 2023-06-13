import { HightlightInputBox } from '.';

export default {
  title: 'Hightlight Inputbox',
  component: HightlightInputBox,
};

export const Default = {
  args: {
    value: 'This is a test',
    word: 'test',
    onChange: (value) => console.log(value),
  },
};
