import { useEffect, useState } from 'react';
import { z } from 'zod';

function useLocalStorage<TData>(
  key: string,
  schema: z.Schema<TData>,
  defaultValue: TData
) {
  const prefixedKey = `spreekey-${key}`;

  const [value, setValue] = useState<TData>(() => {
    const localData = localStorage.getItem(prefixedKey);
    const output = schema.safeParse(
      (localData && JSON.parse(localData)) || String(defaultValue)
    );

    if (!output.success) {
      console.error(`Error parsing ${prefixedKey}: `, output.error);
      return defaultValue;
    }

    return output.data;
  });
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue] as const;
}

export default useLocalStorage;
