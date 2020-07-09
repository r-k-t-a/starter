import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useScrollRestoration(): void {
  const history = useHistory();
  const [lastPathName, setLastPathName] = useState<string | null>(null);
  useEffect(() => {
    history.listen(({ pathname }, action) => {
      if (action === 'PUSH' && pathname !== lastPathName) window.scrollTo(0, 0);
      setLastPathName(pathname);
    });
  });
}
