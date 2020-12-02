() => {
  const [showInformation, setShowInformation] = useState(true);
  const [option, setOption] = useState(1);
  return (
    <div className="u-flex u-backgroundOpaline" style={{ height: '80vh' }}>
      <div className="u-flexShrink-0 u-border u-backgroundWhite u-flex" style={{ width: 360 }}>
        <ChatBox>
          <ChatBox.List>
            <ProblemInfo
              onClickImage={() => window.open('https://design.got-it.io/assets/photo-study/expert-portal/exampleBidding.jpg', '_blank')}
              src="https://design.got-it.io/assets/photo-study/expert-portal/exampleBidding.jpg"
              topicName="Fixing formulas"
              descriptionValue="Hey I’m in a rush and stuck on column H, I need to get this to my boss in an hour. Can you help me figure out which product sells the best?."
              action={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download original file</SafeAnchor>}
            />
            <BubbleChat
              text="System message"
              avatar="gotit"
              type="system"
            />
            <BubbleChat
              text="This is a System message with Options."
              avatar="gotit"
              type="system"
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
              avatar="gotit"
              type="system"
              currentOption={1}
              disabledOption
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
              text="Sender message"
              time="11:23"
            />
            <BubbleChat
              text="This is an example for multiple lines or paragraph Sender message."
              time="11:24"
            />
            <BubbleChat
              time="11:25"
            >
              <FileAttachment
                fileType="spreadsheet"
                fileName="DS-File-name-here-11-12-2019-crazy-designer.xlsx"
                closeButton={false}
                actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
              />
            </BubbleChat>
            <BubbleChat
              time="11:26"
            >
              <FileAttachment
                fileType="image"
                fileName="DS-File-name-here-11-12-2019-crazy-designer.png"
                closeButton={false}
                actionLeft={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Preview</SafeAnchor>}
                actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
              />
            </BubbleChat>
            <BubbleChat
              text="File attachment message"
              time="11:27"
            />
            <BubbleChat
              text="Reviser message"
              type="outbound"
              avatar="expert"
              time="11:28"
            />
            <Separator label="Light" className="u-marginBottomSmall" variant="light" lineType="dashed" />
            <BubbleChat
              text="This is an example for multiple lines or paragraph Outbound message."
              type="outbound"
              avatar="expert"
              time="11:29"
            />
            <BubbleChat
              type="outbound"
              avatar="expert"
              time="11:30"
            >
              <FileAttachment
                fileType="spreadsheet"
                fileName="DS-File-name-here-11-12-2019-crazy-designer.xlsx"
                closeButton={false}
                actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
              />
            </BubbleChat>
            <BubbleChat
              type="outbound"
              avatar="expert"
              time="11:31"
            >
              <FileAttachment
                fileType="image"
                fileName="DS-File-name-here-11-12-2019-crazy-designer.png"
                closeButton={false}
                actionLeft={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Preview</SafeAnchor>}
                actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
              />
            </BubbleChat>
            <BubbleChat
              text="File attachment message"
              type="outbound"
              avatar="expert"
              time="11:32"
            />
            <BubbleChat
              isTyping
              type="outbound"
              avatar="expert"
              time="11:33"
            />
          </ChatBox.List>
          <ChatBox.Context>
            <ChatBox.Notice>
              <Badge variant="black" className="u-alignItemsCenter u-cursorPointer">
                1 new message
                <Icon name="arrowDropdownCircle" className="u-marginLeftTiny" size="tiny" />
              </Badge>
            </ChatBox.Notice>
            <ChatBox.Info>
              <Separator className="u-cursorPointer u-paddingHorizontalExtraSmall u-marginBottomTiny" label="Primary" variant="primary" lineType="dashed" />
              <Message show={showInformation} variant="information" type="system" dismissible onClose={() => setShowInformation(false)}>
                <Message.Container>
                  Message inside ChatBox
                </Message.Container>
              </Message>
              <ChatBox.Attachment>
                <FileAttachment
                  fileName="Bitmap.bmp"
                  fileType="image"
                />
                <FileAttachment
                  fileName="Bitmap.bmp"
                  fileType="image"
                />
              </ChatBox.Attachment>
            </ChatBox.Info>
            <Composer
              inputProps={{
                placeholder: 'Write your message...',
                maxRows: 4,
              }}
            />

          </ChatBox.Context>
        </ChatBox>
      </div>

    </div>
  );
};
