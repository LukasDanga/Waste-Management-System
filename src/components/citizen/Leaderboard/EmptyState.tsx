import { Recycle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 animate-in fade-in duration-500">
      <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-6 mb-4">
        <Recycle className="h-12 w-12 sm:h-14 sm:w-14 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 text-center">
        Chưa có công dân nào được xếp hạng tại khu vực này
      </h3>
      <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-300/80 text-center max-w-sm">
        Hãy là người đầu tiên đóng góp cho môi trường sạch hơn!
      </p>
    </div>
  );
}
