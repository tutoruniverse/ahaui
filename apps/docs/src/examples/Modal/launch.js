() => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="u-textCenter">
              <img src="holder.js/100px160?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
            </div>
            <p>Modal body text goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShow(false)}>Ok, Got It!</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
