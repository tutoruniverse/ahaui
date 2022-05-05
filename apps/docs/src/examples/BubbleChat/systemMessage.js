() => {
  const [option, setOption] = useState(1);
  return (

    <div style={{ maxWidth: 360 }}>
      <BubbleChat
        text="This is a System message with Options."
        avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
        type="system"
        time="16:30"
        currentOption={option}
        onSelectOption={setOption}
        options={[
          {
            name: 'Option 1',
            id: 1,
          },
          {
            name: 'Option 2',
            id: 2,
          },
        ]}
      />
      <BubbleChat
        text="This is a System message with Options."
        avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
        type="system"
        time="16:30"
        disabledOption
        currentOption={1}
        options={[
          {
            name: 'Option 1',
            id: 1,
          },
          {
            name: 'Option 2',
            id: 2,
          },
        ]}
      />
      <BubbleChat
        text="This is a System message with Options."
        avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
        type="system"
        time="16:30"
        disabledOption
        currentOption={null}
        options={[
          {
            name: 'Option 1',
            id: 1,
          },
          {
            name: 'Option 2',
            id: 2,
          },
        ]}
      />
    </div>
  );
};
