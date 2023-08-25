() => {
  const [currentDate, setDate] = useState(new Date());
  return (
    <DatePicker value={currentDate} onChange={date => setDate(currentDate)} />
  );
};
