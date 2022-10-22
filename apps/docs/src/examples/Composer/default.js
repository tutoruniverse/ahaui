() => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 350 }}>
      <Composer
        attachButtonProps={{
          tooltip: "Upload a file",
        }}
        sendButtonProps={{
          isActive: value !== "",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          className: "u-webkitScrollbar",
          placeholder: "Write your message...",
        }}
      />
    </div>
  );
};
