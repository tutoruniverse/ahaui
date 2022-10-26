() => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 350 }}>
      <Composer
        attachButtonProps={{
          icon: "attachImage",
          tooltip: "Upload a file",
        }}
        sendButtonProps={{
          icon: () => (
            <div className="u-marginHorizontalExtraSmall">
              <span className="u-text200">Update</span>
            </div>
          ),
        }}
        sendButtonActive={value !== ''}
        inputProps={{
          className: "u-webkitScrollbar",
          placeholder: "Write your message...",
        }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};
