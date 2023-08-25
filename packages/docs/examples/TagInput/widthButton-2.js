() => {
  const [tags, setTag] = useState(['tag 1', 'tag 2']);
  return (
    <div style={{ maxWidth: 400 }}>
      <Form.Group>
        <Form.InputGroup>
          <TagInput
            className="u-roundedRightNone u-borderRightNone"
            value={tags}
            onChange={tags => setTag(tags)}
          />
          <Form.InputGroup.Append>
            <Button variant="secondary">
              Search
            </Button>
          </Form.InputGroup.Append>
        </Form.InputGroup>
      </Form.Group>
    </div>
  );
};
