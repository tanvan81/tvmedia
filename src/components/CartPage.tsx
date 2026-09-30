import React from 'react';
import { motion } from 'motion/react';
import { Trash2, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { Course } from '../types';

interface CartPageProps {
  items: Course[];
  onRemove: (index: number) => void;
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ items, onRemove, onBack, onCheckout }: CartPageProps) {
  const totalPrice = items.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ''));
    return sum + priceNum;
  }, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-20 bg-slate-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            Giỏ hàng của bạn
          </h1>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Tiếp tục mua sắm</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-slate-500 mb-8">Bạn chưa thêm khóa học nào vào giỏ hàng.</p>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Khám phá khóa học ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div 
                  key={`${item.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-32 h-20 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">Giảng viên: {item.instructor}</p>
                    <div className="text-indigo-600 font-bold">{item.price}</div>
                  </div>
                  <button 
                    onClick={() => onRemove(index)}
                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-32">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Tổng cộng</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính ({items.length} khóa học)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Giảm giá</span>
                    <span className="text-emerald-500">- 0 đ</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Tổng tiền</span>
                    <span className="text-2xl font-bold text-indigo-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 mb-4 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  Thanh toán ngay
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-slate-400">Bằng cách thanh toán, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
