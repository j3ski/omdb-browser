import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import Icon from "../Icon";
import Input from "../Input";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  debounce?: number;
}

const MovieSearch: FC<Props> = ({ value, onChange, debounce }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(ev.currentTarget.value);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [localValue, debounce, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Input
      value={localValue}
      placeholder="Start typing to search..."
      onChange={handleChange}
    >
      <Icon $name="search" />
    </Input>
  );
};

export default MovieSearch;
