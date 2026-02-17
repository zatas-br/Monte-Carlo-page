import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths, 
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { profiles, events } from './data';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface CalendarProps {
  onEventClick?: (event: any) => void;
}

export default function Calendar({ onEventClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = [];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const dayList = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Helper to find events for a specific day
  const getEventsForDay = (day: Date) => {
    const dayEvents = [];
    
    // Check Birthdays
    profiles.forEach(profile => {
      const [bDay, bMonth] = profile.birthDate.split('/');
      if (parseInt(bDay) === day.getDate() && (parseInt(bMonth) - 1) === day.getMonth()) {
        dayEvents.push({
          type: 'birthday',
          title: `Aniversário de ${profile.name}`,
          data: profile
        });
      }
    });

    // Check General Events
    events.forEach(event => {
       // Only process if date format is YYYY-MM-DD (ISO)
       if (event.date.includes('-')) {
          const eventStart = parseISO(event.date);
          const eventEnd = event.endDate ? parseISO(event.endDate) : eventStart;

          // Check if day is within the interval [start, end]
          // We normalize to start of day to avoid time issues
          const checkDay = startOfDay(day);
          const s = startOfDay(eventStart);
          const e = endOfDay(eventEnd);

          if (isWithinInterval(checkDay, { start: s, end: e })) {
             dayEvents.push({
               type: 'event',
               title: event.title,
               data: event
             });
          }
       }
    });

    return dayEvents;
  };

  const activeEvents = getEventsForDay(selectedDate);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/40">
        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
          <VscChevronLeft size={20} />
        </button>
        <span className="text-lg font-bold text-white capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
          <VscChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 bg-black/20 text-gray-400 text-xs py-2 text-center font-bold uppercase tracking-wider">
        {weekDays.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 flex-1 overflow-y-auto auto-rows-fr no-scrollbar">
        {dayList.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`
                min-h-[80px] border-b border-r border-gray-800/50 p-1 flex flex-col items-center justify-start cursor-pointer transition-colors relative
                ${!isCurrentMonth ? 'bg-black/40 text-gray-600' : 'text-gray-300 hover:bg-white/5'}
                ${isSelected ? 'bg-white/10' : ''}
              `}
            >
              <span className={`
                text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1
                ${isToday ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : ''}
              `}>
                {format(day, 'd')}
              </span>

              <div className="flex flex-wrap justify-center gap-1 w-full">
                {dayEvents.map((ev, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full ${ev.type === 'birthday' ? 'bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]' : 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]'}`}
                    title={ev.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      <div className="p-4 border-t border-gray-800 bg-black/40 min-h-[120px]">
        <h4 className="text-sm text-gray-400 mb-2 font-medium capitalize">
          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </h4>
        
        {activeEvents.length > 0 ? (
          <div className="space-y-2">
            {activeEvents.map((ev, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity ${
                  ev.type === 'birthday' 
                    ? 'bg-pink-500/10 border-pink-500/30 text-pink-200' 
                    : 'bg-green-500/10 border-green-500/30 text-green-200'
                }`}
                onClick={() => {
                  if (onEventClick && ev.type === 'event') onEventClick(ev);
                }}
              >
                <span className="text-xl">{ev.type === 'birthday' ? '🎂' : '📅'}</span>
                <div>
                  <p className="font-bold text-sm">{ev.title}</p>
                  {ev.type === 'event' && (
                     <p className="text-xs opacity-70">
                       {ev.data.endDate ? 
                         `${format(parseISO(ev.data.date), 'dd/MM')} - ${format(parseISO(ev.data.endDate), 'dd/MM')}` : 
                         'Evento de um dia'}
                     </p>
                  )}
                   {ev.type === 'birthday' && (
                     <p className="text-xs opacity-70">{ev.data.age + 1} anos (em breve)</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">Nenhum evento neste dia.</p>
        )}
      </div>
    </div>
  );
}
