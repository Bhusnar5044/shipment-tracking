import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function useQueryParams<T>() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams() ?? undefined;
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(params: Partial<T>) {
    if (Object.keys(params).length === 0) {
      const keysToDelete: { key: string }[] = [];
      urlSearchParams.forEach((_value, key) => {
        keysToDelete.push({ key });
      });
      keysToDelete.forEach((item) => urlSearchParams.delete(item.key));
    } else {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          urlSearchParams.delete(key);
        } else {
          urlSearchParams.set(key, String(value));
        }
      });
    }

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';
    // replace since we don't want to build a history
    navigate(`${pathname}${query}`, { replace: true });
  }

  return { queryParams: searchParams, setQueryParams };
}
