() => {
  const [value, setValue] = useState(3);
  return (
    <Rating
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
};
