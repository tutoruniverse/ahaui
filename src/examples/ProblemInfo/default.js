<div style={{ maxWidth: 350 }}>
  <ProblemInfo
    onClickImage={() => window.open('https://design.got-it.io/assets/photo-study/expert-portal/exampleBidding.jpg', '_blank')}
    src="https://design.got-it.io/assets/photo-study/expert-portal/exampleBidding.jpg"
    topicName="Fixing formulas"
    descriptionValue={() => (
      <>
          Not sure where to start?
        <Overlay.Trigger
          placement="right-start"
          delay={{ show: 0, hide: 1000 }}
          hoverOverlay
          overlay={props => (
            <Tooltip style={{ maxWidth: 320 }} variant="white" noArrow id="tooltip-customProblemInfo" {...props}>
              <div className="u-textCenter">
                <span role="img" aria-labelledby="sad">😔</span>
              </div>
              <div className="u-marginBottomTiny">
The student has indicated
                <b>“Not sure where to start”.</b>
              </div>
              <div className="u-marginBottomTiny">They may be feeling overwhelmed and will need your support as you complete the explanation.</div>
              <div className="u-marginBottomTiny"><b>Remember to:</b></div>
              <ul className="u-paddingLeftNone u-marginTopNone u-listStylePositionInside">
                <li>
                  <b>
Clearly explain the concept in
                    <u>basic</u>
                    {' '}
terms
                  </b>
                  {' '}
using accurate, friendly language
                </li>
                <li>
                  <b>Avoid condescending language</b>
                  {' '}
- Don’t use words like “Simple”, “Easy”, “Basic”
                </li>
                <li>
                  <b>Assess their understanding</b>
                  {' '}
by asking questions
                </li>
                <li>
                  <b>Create a safe environment</b>
                  {' '}
with an ecouraging explanation
                </li>
              </ul>
            </Tooltip>
          )}
        >
          <Icon name="informationCircleOutline" size="extraSmall" className="u-marginLeftTiny" style={{ verticalAlign: 'text-top' }} />
        </Overlay.Trigger>
      </>
    )}
    additionalValue="Hey I’m in a rush and stuck on column H, I need to get this to my boss in an hour. Can you help me figure out which product sells the best?"
    action={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download original file</SafeAnchor>}
  />
</div>;
