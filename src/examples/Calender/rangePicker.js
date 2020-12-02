() => {
  const [startDate, setStartDate] = useState([new Date(), new Date()]);
  return (
    <DateRangePicker value={startDate} onChange={date => setStartDate(date)} />
  );
};
