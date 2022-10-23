<div style={{ maxWidth: 360 }}>
  <BubbleChat
    text={
      <div
        className="u-textPreNormal u-paddingVerticalExtraSmall u-paddingRightExtraSmall u-inlineBlock"
        dangerouslySetInnerHTML={{
          __html: `
          <table class="Table Table--bordered u-backgroundWhite u-textDark u-text200" style="margin-bottom:0;">
      <thead>
        <tr>
          <th scope="col" width="110px">Customer ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Phone</th>
          <th scope="col">Job Title</th>
          <th scope="col">City</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>Number</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>XO</td>
            <td>+1234567890</td>
            <td>Eng</td>
            <td>US</td>
          </tr>
          <tr>
            <td>Number</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>XO</td>
            <td>+1234567890</td>
            <td>Eng</td>
            <td>US</td>
          </tr>
      </tbody>
    </table>`,
        }}
      />
    }
    type="outbound"
    avatar={() => (
      <Avatar
        size="small"
        className="u-backgroundPrimaryLighter u-textPrimary u-text100"
        text="KT"
      />
    )}
    time="16:24"
  />
</div>;
