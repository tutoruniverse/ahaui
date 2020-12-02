() => {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  return (
    <>
      <Toggle
        nonLabel
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <span className="u-paddingLeftTiny">
        <Toggle
          nonLabel
          checked={checked2}
          onClick={() => setChecked2(!checked2)}
        />
      </span>
    </>
  );
};
