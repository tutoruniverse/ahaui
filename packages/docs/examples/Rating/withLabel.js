() => {
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  return (
    <div className="u-flex">
      <div className="u-textCenter">
        <Rating
          name="precision"
          value={2.5}
          precision={0.5}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        <div className="u-text200 u-fontMedium u-marginTopTiny u-textGray">{labels[hover !== -1 ? hover : value]}</div>
      </div>
    </div>
  );
};
