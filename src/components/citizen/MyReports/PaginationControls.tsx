import { Button } from '../../ui/button';

export function PaginationControls() {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm hover:bg-gray-100">Trước</Button>
      <Button className="border border-gray-300 px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700">1</Button>
      <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm hover:bg-gray-100">2</Button>
      <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm hover:bg-gray-100">3</Button>
      <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm hover:bg-gray-100">Sau</Button>
    </div>
  );
}
