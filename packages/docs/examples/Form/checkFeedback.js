() => {
  const [check, setCheck] = useState(true);
  const [radioCheck, setRadioCheck] = useState(false);
  return (
    <>
      <Form.Group controlId="exampleForm.check3">
        <Form.Check checked={check} isValid={check} isInvalid={!check} onChange={() => setCheck(!check)} label="Checkbox" />
        <Form.Feedback>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Form.Feedback>
        <Form.Feedback type="invalid">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Form.Feedback>
      </Form.Group>

      <Form.Group controlId="exampleForm.radio3">
        <Form.Check checked={radioCheck} onChange={() => setRadioCheck(!radioCheck)} isInvalid={!radioCheck} type="radio" label="Radio button" />
        <Form.Feedback>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Form.Feedback>
        <Form.Feedback type="invalid">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Form.Feedback>
      </Form.Group>
    </>
  );
};
