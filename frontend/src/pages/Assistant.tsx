import { useState } from 'react';
import { Sparkles, Send, Map } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function AIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your global travel assistant. Which trip would you like to discuss, or do you need ideas for a new one?' }
  ]);

  const handleSend = () => {
    if (!input) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I've noted your request. As an AI, I can help you find cheap flights, suggest local hidden gems, or revise your itineraries." }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-primary-600 dark:text-primary-400">
          <Sparkles className="w-5 h-5" /> TripWise Assistant
        </div>
        <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option>Select a trip context...</option>
          <option>Goa Getaway (Upcoming)</option>
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:outline-none focus:border-primary-500"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <Button className="rounded-xl px-6" onClick={handleSend}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
