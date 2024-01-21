import React from 'react';

import Tooltip from 'shared/components/Tooltip';

const AboutTooltip = tooltipProps => (
  <Tooltip width={300} {...tooltipProps} renderContent={() => <React.Fragment></React.Fragment>} />
);

export default AboutTooltip;
