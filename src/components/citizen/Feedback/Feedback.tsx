import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '../../ui/button';
import { FeedbackForm } from './FeedbackForm';
import { FeedbackList } from './FeedbackList';
import type { FeedbackFormData, FeedbackItem } from './types';

export function Feedback() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'feedback',
    relatedReport: '',
    title: '',
    description: '',
    priority: 'medium'
  });

  const feedbackList: FeedbackItem[] = [
    {
      id: '#FB-001',
      type: 'complaint',
      typeLabel: '⚠️ Khiếu nại',
      title: 'Chưa thu đúng giờ',
      status: 'processing',
      statusLabel: 'Đang xử lý',
      date: '10/01/2026',
      response: null
    },
    {
      id: '#FB-002',
      type: 'feedback',
      typeLabel: '💬 Góp ý',
      title: 'Giao diện rất dễ sử dụng',
      status: 'resolved',
      statusLabel: 'Đã xử lý',
      date: '05/01/2026',
      response: 'Cảm ơn bạn đã góp ý!'
    },
    {
      id: '#FB-003',
      type: 'support',
      typeLabel: '❓ Hỗ trợ',
      title: 'Làm sao để đổi điểm thưởng?',
      status: 'resolved',
      statusLabel: 'Đã xử lý',
      date: '28/12/2025',
      response: 'Bạn có thể xem phần Điểm thưởng để biết chi tiết.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Phản hồi đã được gửi thành công!');
    setShowForm(false);
    setFormData({
      type: 'feedback',
      relatedReport: '',
      title: '',
      description: '',
      priority: 'medium'
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Phản hồi & Khiếu nại</h1>
        <p className="text-gray-600">Gửi ý kiến của bạn hoặc báo cáo vấn đề</p>
      </div>

      {/* Create New Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-green-600 hover:bg-green-700"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Tạo phản hồi mới
        </Button>
      )}

      {/* Create Form */}
      {showForm && (
        <FeedbackForm
          formData={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Feedback List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Phản hồi của tôi</h2>
        <FeedbackList items={feedbackList} />
      </div>
    </div>
  );
}
