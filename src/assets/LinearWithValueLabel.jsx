import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ triggerReset }) {
  const [progress, setProgress] = React.useState(0);
// 
  React.useEffect(() => {
    const totalDuration = 30000; // 30 seconds
    const interval = 100; // Update every 100ms
    const increment = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + increment
      );
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [triggerReset]); // Re-run effect when triggerReset changes

  // Reset the progress when triggerReset changes
  React.useEffect(() => {
    setProgress(0);
  }, [triggerReset]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  /**
   * A trigger prop to reset the timer.
   */
  triggerReset: PropTypes.any,
};
