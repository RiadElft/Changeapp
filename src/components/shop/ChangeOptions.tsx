import React, { useState } from 'react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useUser } from '../../contexts/UserContext';
import Card, { CardHeader, CardBody } from '../common/Card';
import Button from '../common/Button';
import { ArrowLeft, Banknote, Heart, CreditCard } from 'lucide-react';
import { ChangeOption } from '../../types';
import { usePayoutRequests } from '../../contexts/PayoutRequestContext';

const ChangeOptions: React.FC = () => {
  const { currentTransaction, updateTransactionStatus } = useTransaction();
  const { userType } = useUser();
  const { addPayoutRequest } = usePayoutRequests();
  const [selectedOption, setSelectedOption] = useState<ChangeOption | null>(null);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [ccp, setCcp] = useState('');
  const [cardInfo, setCardInfo] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  if (!currentTransaction || userType !== 'shop') {
    return null;
  }

  const handleOptionSelect = (option: ChangeOption) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const handleReturnCash = () => {
    updateTransactionStatus(currentTransaction.id, 'completed');
    setSelectedOption(null);
  };

  const handleDonateConfirm = () => {
    updateTransactionStatus(currentTransaction.id, 'completed');
    setSelectedOption(null);
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ccp && !cardInfo) return;
    addPayoutRequest({ ccp, cardInfo, amount: currentTransaction.change });
    setSuccess(true);
    setCcp('');
    setCardInfo('');
    setTimeout(() => {
      setSuccess(false);
      setShowPayoutForm(false);
    }, 2000);
  };

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      {!selectedOption && !showPayoutForm ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <h2 className="text-xl font-semibold">خيارات الفكة</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                ماذا تريد أن تفعل بمبلغ الفكة <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span>؟
              </p>
              
              <Button 
                onClick={() => handleOptionSelect('return')}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">إرجاع النقود</span>
                <Banknote className="text-gray-500" />
              </Button>
              
              <Button 
                onClick={() => handleOptionSelect('donate')}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">التبرع للجمعيات الخيرية</span>
                <Heart className="text-red-500" />
              </Button>
              
              <Button
                onClick={() => setShowPayoutForm(true)}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3 border-yellow-400 text-yellow-700"
              >
                <span className="font-medium">طلب سحب من المشرف</span>
                <CreditCard className="text-yellow-600" />
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : showPayoutForm ? (
        <Card>
          <CardHeader className="bg-yellow-500 text-white">
            <div className="flex items-center">
              <button onClick={() => setShowPayoutForm(false)} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">طلب سحب من المشرف</h2>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم CCP</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={ccp}
                  onChange={e => setCcp(e.target.value)}
                  placeholder="أدخل رقم CCP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">معلومات البطاقة (اختياري)</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={cardInfo}
                  onChange={e => setCardInfo(e.target.value)}
                  placeholder="أدخل معلومات البطاقة"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المبلغ</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                  value={currentTransaction.change}
                  readOnly
                />
                <span className="text-xs text-gray-500">هذا هو مبلغ الفكة لهذه المعاملة.</span>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                disabled={!ccp && !cardInfo}
              >
                إرسال الطلب
              </button>
              {success && (
                <div className="mt-2 text-green-600 text-center font-semibold">تم إرسال الطلب إلى المشرف!</div>
              )}
            </form>
          </CardBody>
        </Card>
      ) : selectedOption === 'return' ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">إرجاع النقود</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                يرجى إرجاع <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span> للعميل.
              </p>
              
              <div className="flex justify-end">
                <Button onClick={handleReturnCash}>تأكيد الإرجاع</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : selectedOption === 'donate' ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">التبرع للجمعيات الخيرية</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                تبرع بمبلغ <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span> للجمعية الخيرية الشريكة.
              </p>
              
              <div className="flex justify-end">
                <Button onClick={handleDonateConfirm}>تأكيد التبرع</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
};

export default ChangeOptions;