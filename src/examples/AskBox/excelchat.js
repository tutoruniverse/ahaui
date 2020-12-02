
() => {
  const [value, setValue] = useState('');
  return (
    <div className="Container">
      <div className="Grid">
        <div className="u-sizeFull lg:u-size4of6 lg:u-offset1of6">
          <AskBox className="u-shadowMedium u-roundedMedium">
            <AskBox.Header>
              <AskBox.Title>Post your problem and you'll get expert help in seconds</AskBox.Title>
            </AskBox.Header>
            <AskBox.Body>
              <div className="u-paddingBottomSmall">
                <Form.Input
                  as="textarea"
                  rows="4"
                  placeholder="I need a formula to combine column C with the number mentioned in column L26 to L32..."
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </div>
            </AskBox.Body>
            <AskBox.Footer>
              <Button width="full" variant="accent" disabled={value == ''}>Get Started for Free</Button>
              <AskBox.Note>
                Our professional experts are available now. Your privacy is guaranteed.
              </AskBox.Note>
            </AskBox.Footer>
          </AskBox>
        </div>
      </div>
    </div>
  );
};
