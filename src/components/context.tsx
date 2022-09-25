import { usePrompt } from "contexts/prompt";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Question() {
  const { contexts, setContexts } = usePrompt();

  const updateContext = (idx: number, newVal: { [k: string]: string }) => {
    const newContext = contexts.reduce((r, c, i) => {
      if (i === idx) {
        c = { ...c, ...newVal };
      }
      r.push(c);
      return r;
    }, contexts);
    setContexts(newContext);
  };
  return (
    <Box
      component="form"
      className="w-full py-4 flex flex-col gap-8"
      noValidate
      autoComplete="off"
    >
      {contexts.map((cx, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-3">
          <TextField
            className="col-span-2"
            label="ラベル"
            variant="outlined"
            value={cx.label}
            onChange={(e) => updateContext(idx, { label: e.target.value })}
          />
          <TextField
            className="col-span-10"
            multiline
            label="内容"
            variant="outlined"
            value={cx.content}
            onChange={(e) => updateContext(idx, { content: e.target.value })}
          />
        </div>
      ))}
    </Box>
  );
}
