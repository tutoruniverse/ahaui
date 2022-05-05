() => {
  const [fileName, setFileName] = useState(null);
  const fileOnChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
  };
  return (
    <Form.Group controlId="exampleForm.FileUpload">
      <Form.Label>File input</Form.Label>
      <Form.File placeholder="No choose file" fileName={fileName} onChange={fileOnChange} />
    </Form.Group>
  );
};
