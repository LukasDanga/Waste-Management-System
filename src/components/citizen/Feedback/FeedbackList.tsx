import type { FeedbackItem } from './types';
import { FeedbackListItem } from './FeedbackListItem';

interface FeedbackListProps {
  items: FeedbackItem[];
}

export function FeedbackList({ items }: FeedbackListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeedbackListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
