() => {
  const [selectedValue, setSelectedValue] = useState(1);
  return (
    <>
      {[1, 2, 3].map((value, index) => (
        <Form.Check
          key={index}
          name="some-radio-button"
          checked={value === selectedValue}
          onChange={() => setSelectedValue(value)}
          type="radio"
          label={`Radio button ${value}`}
          id={`radio-button-${value}`}
        />
      ))}
    </>
  );
}