import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface CreateRoleDialogProps {
  onCreate?: (name: string, description: string) => void;
}

export function CreateRoleDialog({ onCreate }: CreateRoleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (onCreate) {
      onCreate(name, description);
    }
    setIsOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Tạo vai trò mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo vai trò tùy chỉnh</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="role-name">Tên vai trò</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên vai trò"
            />
          </div>
          <div>
            <Label htmlFor="role-description">Mô tả</Label>
            <Textarea
              id="role-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả vai trò..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button className="border border-gray-300 text-gray-700" onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreate}>
              Tạo vai trò
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
