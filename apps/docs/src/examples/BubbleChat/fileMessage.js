<div style={{ maxWidth: 360 }}>
  <BubbleChat time="14:00">
    <FileAttachment
      fileType="spreadsheet"
      fileName="DS-File-name-here-11-12-2019-crazy-designer.xlsx"
      closeButton={false}
      actionRight={() => (
        <SafeAnchor className="hover:u-textDecorationNone u-block u-flexGrow1 u-textCenter u-paddingTiny">
          Download
        </SafeAnchor>
      )}
    />
  </BubbleChat>
  <BubbleChat time="14:00">
    <FileAttachment
      fileType="image"
      fileName="DS-File-name-here-11-12-2019-crazy-designer.png"
      closeButton={false}
      actionLeft={() => (
        <SafeAnchor className="hover:u-textDecorationNone u-block u-flexGrow1 u-textCenter u-paddingTiny">
          Preview
        </SafeAnchor>
      )}
      actionRight={() => (
        <SafeAnchor className="hover:u-textDecorationNone u-block u-flexGrow1 u-textCenter u-paddingTiny">
          Download
        </SafeAnchor>
      )}
    />
  </BubbleChat>
</div>;
