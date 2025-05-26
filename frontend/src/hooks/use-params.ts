import { useParams as useRouteParams } from 'react-router';

export default function useParams() {
  const result = useRouteParams();
  return result;
}
