import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";

interface ISelectMultipleChips {
  options: Array<string>;
  label: string;
  selectedOption: string[];
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectMultipleChips: React.FC<ISelectMultipleChips> = ({
  options,
  label,
  selectedOption,
  setOption,
}) => {
  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (
    name: string,
    personName: readonly string[],
    theme: Theme
  ) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
    const {
      target: { value },
    } = event;
    setOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClear = () => {
    setOption([]); // Clear all selected fields
  };

  const handleClearField = (name: string) => {
    setOption((prevNames) => prevNames.filter((n) => n !== name)); // Clear individual field
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120, width: "50%" }}
      margin="normal"
      size="medium"
    >
      <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedOption}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleClearField(value)} // Handle clearing individual field
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((eachOption) => (
          <MenuItem
            key={eachOption}
            value={eachOption}
            style={getStyles(eachOption, selectedOption, theme)}
          >
            {eachOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
