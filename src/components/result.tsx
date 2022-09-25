import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface TextWithCopyButtonProps {
  text: string;
}

const TextWithCopyButton = ({ text }: TextWithCopyButtonProps) => {
  const [openTip, setOpenTip] = useState<boolean>(false);

  const handleCloseTip = (): void => {
    setOpenTip(false);
  };

  const handleClickButton = (): void => {
    setOpenTip(true);
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full relative border border-gray-100 p-10 rounded-xl text-sm flex items-center">
      <Typography color="text.secondary">{text}</Typography>
      <div className="absolute top-3 right-3">
        <Tooltip
          arrow
          open={openTip}
          onClose={handleCloseTip}
          disableHoverListener
          placement="top"
          title="Copied!"
        >
          <IconButton disabled={text === ""} onClick={handleClickButton}>
            <AssignmentIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default TextWithCopyButton;
