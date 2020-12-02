() => {
  const [currentDate, setDate] = useState(new Date());
  return (
    <Calendar value={currentDate} onChange={date => setDate(currentDate)} />
  );
};
