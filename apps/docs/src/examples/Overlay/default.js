() => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Button variant="primary" ref={target} onClick={() => setShow(!show)}>
        Click me to see
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {props => (
          <Tooltip id="tooltip-right" {...props}>
            My Tooltip
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
