() => {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  return (
    <>
      <Toggle
        className="u-marginRightSmall"
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <Toggle
        checked={checked2}
        onClick={() => setChecked2(!checked2)}
      />
    </>
  );
};
