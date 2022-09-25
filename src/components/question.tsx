import { usePrompt } from "contexts/prompt";
import Slider from "components/slider";
import Loading from "components/loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Result from "components/result";

export default function Question() {
  const {
    input,
    setInput,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    predict,
    choices,
    loading,
  } = usePrompt();
  return (
    <Box
      component="form"
      className="w-full py-4 flex flex-col gap-8"
      noValidate
      autoComplete="off"
    >
      <Loading open={loading} />
      <Slider
        className="w-full max-w-sm"
        label="想像力"
        value={temperature}
        setValue={setTemperature}
        max={1}
        min={0}
        step={0.1}
      />
      <Slider
        className="w-full max-w-sm"
        label="最大単語数"
        value={maxTokens}
        setValue={setMaxTokens}
        max={4000}
        min={1}
        step={1}
      />
      <TextField
        id="question"
        label="質問"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={predict} variant="outlined" color="primary">
        予測
      </Button>
      {choices.length > 0 &&
        choices.map((choice, idx) => <Result key={idx} text={choice.text} />)}
    </Box>
  );
}
