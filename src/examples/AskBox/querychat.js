() => {
  const [value, setValue] = useState('');
  const [GDPR, setGDPR] = useState(false);
  const [sqlEnv, setSqlEnv] = useState('mysql');
  const [fileOption, setFileOption] = useState('google');
  const [fileName, setFileName] = useState(null);
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
              <Form.Group sizeControl="small" className="u-marginBottomSmall">
                <div className="u-flex u-alignItemsCenter u-marginBottomExtraSmall">
                  <div className="u-fontMedium u-flexShrink-0 u-marginRightSmall">Select your SQL Environment:</div>
                  <Form.Select
                    className="u-widthFull"
                    value={sqlEnv}
                    onChange={e => setSqlEnv(e.target.value)}
                  >
                    <option value="mysql">MySQL</option>
                    <option value="oracle">Oracle</option>
                    <option value="sqlserver">SQL Server</option>
                    <option value="googlebigquery">Google BigQuery</option>
                    <option value="other">Other</option>
                    <option value="none">I don't know</option>
                  </Form.Select>
                </div>
                {sqlEnv === 'other' && (
                  <Form.Input type="text" placeholder="Please specify (MariaDB, SQLite, MonetDB...)" />
                )}
              </Form.Group>
              <Form.Group sizeControl="small" className="u-marginBottomSmall">
                <div className="u-flex u-alignItemsCenter u-marginBottomExtraSmall">
                  <div className="u-fontMedium u-flexShrink-0 u-marginRightSmall">
Files:
                    {' '}
                    <span className="u-fontRegular u-textLight">(optional)</span>
                  </div>
                  <Form.Select
                    className="u-widthFull"
                    value={fileOption}
                    onChange={e => setFileOption(e.target.value)}
                  >
                    <option value="google">Google sheet link</option>
                    <option value="computer">From your Computer</option>
                  </Form.Select>
                </div>
                {fileOption === 'google' && (
                  <Form.Input type="text" placeholder="https://docs.gooogle.com/spreadheets/....." />
                )}
                {fileOption === 'computer' && (
                  <Form.File
                    id="exampleForm.FileUpload"
                    placeholder="No choose file"
                    fileName={fileName}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFileName(file.name);
                    }}
                  />
                )}

              </Form.Group>
              <div className="u-marginBottomSmall">
                <Form.Check
                  id="askbox.check1"
                  checked={GDPR}
                  onChange={e => setGDPR(e.target.checked)}
                  className="u-marginBottomExtraSmall"
                  label="I am an EU citizen or California resident"
                />
                {GDPR && (
                  <div className="u-marginLeftSmall">
                    <Form.Check
                      id="askbox.check2"
                      label={() => (
                        <React.Fragment>
                          I have read and accepted the
                          <SafeAnchor>privacy policy</SafeAnchor>
                        </React.Fragment>
                      )}
                    />
                  </div>
                )}
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
