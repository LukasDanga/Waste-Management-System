import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import type { PointRuleCategory } from './types';

interface PointRulesSectionProps {
  categories: PointRuleCategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PointRulesSection({ categories, open, onOpenChange }: PointRulesSectionProps) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <Card className="p-6">
        <CollapsibleTrigger asChild>
          <Button className="w-full justify-between p-0 h-auto bg-transparent hover:bg-transparent">
            <h2 className="text-xl font-bold">Chi tiết cách tính điểm</h2>
            {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-6">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.category}>
                <h3 className="font-semibold text-lg mb-3 text-green-600">{category.category}</h3>
                <div className="space-y-2">
                  {category.rules.map((rule) => (
                    <div
                      key={`${category.category}-${rule.action}`}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm">{rule.action}</span>
                      <span className="font-semibold text-green-600">{rule.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              💡 <strong>Lưu ý:</strong> Điểm thưởng có thể thay đổi tùy theo chính sách. Báo cáo sai thông tin hoặc spam
              sẽ bị trừ điểm và có thể bị khóa tài khoản.
            </p>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
