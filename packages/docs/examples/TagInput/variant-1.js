() => {
  const [tags, setTag] = useState(['tag 1', 'tag 2']);
  return (
    <div style={{ maxWidth: 300 }}>
      <TagInput
        variant="warning_subtle"
        value={tags}
        onChange={tags => setTag(tags)}
      />
    </div>
  );
};
