import { ReportTemplate } from './types';
import { getColorClasses } from './colorUtils';

interface ReportTemplatesProps {
  templates: ReportTemplate[];
  selectedTemplateId: string;
  onSelect: (id: string) => void;
}

export function ReportTemplates({ templates, selectedTemplateId, onSelect }: ReportTemplatesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Mẫu báo cáo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const colors = getColorClasses(template.color);
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-md ${
                isSelected ? `${colors.border} ${colors.bg}` : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
