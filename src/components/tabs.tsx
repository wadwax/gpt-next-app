import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="w-full"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Tab {
  label: string;
  content: React.ReactNode | string;
}

interface BasicTabsProps {
  tabs: Tab[];
}

export default function BasicTabs({ tabs }: BasicTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, idx) => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, idx) => (
        <TabPanel key={tab.label} value={value} index={idx}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}
