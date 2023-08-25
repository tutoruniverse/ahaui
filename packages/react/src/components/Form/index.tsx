import React from 'react';
import Check, { FormCheckProps } from './Check';
import File, { FormFileProps } from './File';
import Input, { FormInputProps } from './Input';
import Label from './Label';
import Feedback, { FormFeedbackProps } from './Feedback';
import Group, { FormGroupProps } from './Group';
import InputGroup, { FormInputGroupProps } from './InputGroup';
import Select, { FormSelectProps } from './Select';

const Form = React.forwardRef((
  props: React.ComponentPropsWithRef<'form'>,
  ref: React.ForwardedRef<HTMLFormElement>,
) => (
  <form
    ref={ref}
    {...props}
  />
));

const CompoundForm = Object.assign(Form, {
  Check,
  File,
  Input,
  Label,
  Feedback,
  Group,
  InputGroup,
  Select,
  displayName: 'Form',
});

export default CompoundForm;
export type {
  FormCheckProps,
  FormFeedbackProps,
  FormFileProps,
  FormGroupProps,
  FormInputProps,
  FormInputGroupProps,
  FormSelectProps,
};
