() => {
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);
  const numbers = {
    0.5: '0.5',
    1: '1.0',
    1.5: '1.5',
    2: '2.0',
    2.5: '2.5',
    3: '3.0',
    3.5: '3.5',
    4: '4.0',
    4.5: '4.5',
    5: '5.0',
  };
  return (
    <div className="u-flex">
      <div className="u-flex u-alignItemsCenter">
        <Rating
          name="precision"
          value={2.5}
          precision={0.5}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        <div className="u-text200 u-fontMedium u-marginTopTiny u-textGray">{numbers[hover !== -1 ? hover : value]}</div>
      </div>
    </div>
  );
};
