import React from 'react';
import Check from './Check';
import File from './File';
import Input from './Input';
import Label from './Label';
import Feedback from './Feedback';
import Group from './Group';
import InputGroup from './InputGroup';
import Select from './Select';


const Form = React.forwardRef((props, ref) => (
  <form
    ref={ref}
    {...props}
  />
));
Form.Group = Group;
Form.Check = Check;
Form.File = File;
Form.Input = Input;
Form.InputGroup = InputGroup;
Form.Label = Label;
Form.Feedback = Feedback;
Form.displayName = 'Form';
Form.Select = Select;
export default Form;
