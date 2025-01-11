import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const useToggle: (
  defaultValue?: boolean,
) => [boolean, () => void, () => void, Dispatch<SetStateAction<boolean>>] = defaultValue => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue(x => !x);
  }, []);

  const clear = useCallback(() => {
    setValue(defaultValue ?? false);
  }, [defaultValue]);

  return [value, toggle, clear, setValue];
};

export default useToggle;
