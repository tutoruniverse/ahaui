() => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setToggle(!toggle)}>Toggle me</Button>
      <Collapse in={toggle}>
        <div>
          <div className="u-border u-backgroundWhite u-paddingHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall u-textGray u-marginTopSmall">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
        </div>
      </Collapse>
    </>
  );
};
