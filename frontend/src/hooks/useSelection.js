import { useState, useCallback } from "react";

const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const selectOne = useCallback((id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const selectAll = useCallback((ids, checked) => {
    setSelectedIds(checked ? new Set(ids) : new Set());
  }, []);

  const removeOne = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelectedIds(new Set()), []);

  return { selectedIds, selectOne, selectAll, removeOne, clear };
};

export default useSelection;
