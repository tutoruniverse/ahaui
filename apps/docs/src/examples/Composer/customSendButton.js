() => {
  const [value, setValue] = useState('');
  return (
    <div style={{ maxWidth: 350 }}>
      <Composer
        sendButtonIcon={() => (
          <div className="u-marginHorizontalExtraSmall">
            <span className="u-text200">Update</span>
          </div>
        )}
        disabledSendButton={false}
        sendButtonActive={value !== ''}
        value={value}
        onChange={e => setValue(e.target.value)}
        inputProps={{
          className: 'u-webkitScrollbar',
          placeholder: 'Write your message...',
        }}
        tooltipAttachButton="Upload a file"
      />
    </div>
  );
};
