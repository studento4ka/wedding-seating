import React, { useState, useMemo } from 'react';
import { PRESIDIUM, TABLES } from './data/weddingData';
import { Search, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [activeTableId, setActiveTableId] = useState(null);

  const allGuests = useMemo(() => {
    const list = [];

    if (PRESIDIUM && PRESIDIUM.roles) {
      PRESIDIUM.roles.forEach(person => {
        list.push({
          name: person.name,
          role: person.title,
          tableId: 'presidium',
          tableName: 'Стіл Молодят',
          tableNumber: 0
        });
      });
    }

    if (TABLES) {
      TABLES.forEach(table => {
        table.guests.forEach(guestName => {
          list.push({
            name: guestName,
            role: null,
            tableId: table.id,
            tableName: table.title,
            tableNumber: table.number
          });
        });
      });
    }

    return list;
  }, []);

  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allGuests.filter(g =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allGuests]);

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest);
    setActiveTableId(guest.tableId);
    setSearchQuery('');

    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#D880AD', '#7A886A', '#E6C5C0', '#4A5A3A'],
      origin: { y: 0.75 }
    });
  };

  const clearSelection = () => {
    setSelectedGuest(null);
    setActiveTableId(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8F5EC] text-[#4A5A3A] pb-12 px-3 relative overflow-hidden font-sans">

      {/* ПОДВІЙНА РАМКА ВЕСІЛЬНОЇ ПОЛІГРАФІЇ */}
      <div className="my-3 p-2.5 border-2 border-[#D880AD]/40 rounded-3xl relative bg-[#F8F5EC]">
        <div className="border border-[#7A886A]/50 rounded-2xl p-3 relative pt-4">

          {/* Шапка */}
          <header className="pt-2 pb-3 text-center">
            <div className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#7A886A] mb-1">
              Знайдіть своє
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#4A5A3A] tracking-wider uppercase">
              Місце
            </h1>
            <div className="text-[#D880AD] text-base mt-1">♡</div>
          </header>

          {/* Пошук */}
          <div className="relative mb-5">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#D880AD]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введіть ім'я або прізвище..."
                className="w-full pl-11 pr-10 py-3 bg-white/90 rounded-xl border-2 border-[#D880AD]/40 focus:outline-none focus:border-[#D880AD] focus:ring-1 focus:ring-[#D880AD] text-sm text-[#4A5A3A] placeholder-[#7A886A]/60 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-[#D880AD]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Випадаючий результат */}
            {filteredGuests.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#F8F5EC] rounded-xl shadow-xl border-2 border-[#D880AD]/40 overflow-hidden z-50 max-h-60 overflow-y-auto divide-y divide-[#D880AD]/20">
                {filteredGuests.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectGuest(item)}
                    className="w-full px-4 py-2.5 text-left hover:bg-[#D880AD]/15 flex justify-between items-center transition"
                  >
                    <div>
                      <div className="font-medium text-sm text-[#4A5A3A]">{item.name}</div>
                      {item.role && <div className="text-[10px] text-[#7A886A]">{item.role}</div>}
                    </div>
                    <span className="text-xs font-serif font-semibold bg-[#D880AD] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.tableNumber === 0 ? 'Молодята' : `Стіл №${item.tableNumber}`}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Картка знайденого гостя */}
          {selectedGuest && (
            <div className="mb-5 p-3.5 bg-gradient-to-r from-[#D880AD] to-[#C86F9C] text-white rounded-xl shadow-md relative overflow-hidden border border-[#D880AD]">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="flex items-center gap-1 text-[#F8F5EC] text-[11px] font-medium mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F8F5EC]" /> Ваше місце підсвічено!
                  </div>
                  <h2 className="text-xl font-serif font-bold tracking-wide">
                    {selectedGuest.name}
                  </h2>
                  <p className="text-xs text-[#F8F5EC]/90 mt-0.5 font-light">
                    {selectedGuest.tableName} {selectedGuest.role ? `• ${selectedGuest.role}` : ''}
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="bg-white/20 p-1 rounded-full text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* СХЕМА ЗАЛУ */}
          <section className="mb-5 bg-white/60 border border-[#D880AD]/30 rounded-2xl p-3 shadow-2xs">
            <div className="flex justify-between items-center mb-3 px-1">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#7A886A]">
                Схема залу
              </span>
              {activeTableId && (
                <button
                  onClick={() => setActiveTableId(null)}
                  className="text-xs text-[#D880AD] font-semibold underline underline-offset-2"
                >
                  Скинути
                </button>
              )}
            </div>

            {/* 6 ВЕРТИКАЛЬНИХ СТОЛІВ */}
            <div className="grid grid-cols-6 gap-1.5 mb-4">
              {TABLES.map((table) => {
                const isActive = activeTableId === table.id;
                const isDimmed = activeTableId !== null && !isActive;

                return (
                  <div
                    key={table.id}
                    onClick={() => setActiveTableId(isActive ? null : table.id)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      isDimmed ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    <div
                      className={`w-full h-32 rounded-lg border-2 transition-all duration-300 flex flex-col justify-between py-2 items-center ${
                        isActive
                          ? 'bg-[#7A886A] border-[#4A5A3A] text-white shadow-md scale-105'
                          : 'bg-[#F8F5EC] border-[#D880AD]/40 hover:border-[#D880AD]'
                      }`}
                    >
                      <div className="w-full flex justify-between px-1">
                        <div className={`w-1 h-2.5 rounded-full ${isActive ? 'bg-[#D880AD]' : 'bg-[#D880AD]/60'}`}></div>
                        <div className={`w-1 h-2.5 rounded-full ${isActive ? 'bg-[#D880AD]' : 'bg-[#D880AD]/60'}`}></div>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-serif font-bold text-xs ${
                        isActive ? 'bg-[#D880AD] text-white' : 'bg-[#D880AD]/20 text-[#4A5A3A]'
                      }`}>
                        {table.number}
                      </div>

                      <div className="w-full flex justify-between px-1">
                        <div className={`w-1 h-2.5 rounded-full ${isActive ? 'bg-[#D880AD]' : 'bg-[#D880AD]/60'}`}></div>
                        <div className={`w-1 h-2.5 rounded-full ${isActive ? 'bg-[#D880AD]' : 'bg-[#D880AD]/60'}`}></div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-medium mt-1 transition ${
                      isActive ? 'text-[#D880AD] font-bold' : 'text-[#7A886A]'
                    }`}>
                      №{table.number}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* СТІЛ МОЛОДЯТ */}
            <div
              onClick={() => setActiveTableId(activeTableId === 'presidium' ? null : 'presidium')}
              className={`cursor-pointer transition-all duration-300 rounded-xl py-2.5 px-3 border-2 text-center ${
                activeTableId === 'presidium'
                  ? 'bg-[#7A886A] text-white border-[#4A5A3A] shadow-sm'
                  : activeTableId !== null
                  ? 'bg-white/40 border-[#7A886A]/20 opacity-30'
                  : 'bg-gradient-to-r from-[#F8F5EC] via-[#FDF2F7] to-[#F8F5EC] border-[#D880AD] text-[#4A5A3A] hover:border-[#D880AD]'
              }`}
            >
              <span className="font-serif font-bold text-base tracking-widest uppercase">
                Стіл Молодят
              </span>
            </div>
          </section>

          {/* СПИСОК СТОЛІВ ТА ГОСТЕЙ */}
          <section className="space-y-3">
            {/* Стіл Молодят */}
            {(activeTableId === null || activeTableId === 'presidium') && (
              <div className="bg-[#F8F5EC] border-2 border-[#D880AD]/60 rounded-xl p-3 shadow-2xs">
                <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#D880AD]/30">
                  <h3 className="font-serif font-bold text-base text-[#4A5A3A] tracking-wide flex items-center gap-1.5">
                    Стіл Молодят <span className="text-[#D880AD] text-xs">♡</span>
                  </h3>
                  <span className="text-[10px] bg-[#7A886A]/15 text-[#4A5A3A] font-semibold border border-[#7A886A]/30 px-2.5 py-0.5 rounded-full shadow-2xs">
                    {PRESIDIUM.roles.length} осіб
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESIDIUM.roles.map((person, idx) => {
                    const isSelected = selectedGuest?.name === person.name;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-xs transition ${
                          isSelected
                            ? 'bg-[#D880AD] text-white font-bold ring-2 ring-[#4A5A3A]'
                            : person.isMain
                            ? 'bg-white border border-[#D880AD] font-semibold text-[#4A5A3A]'
                            : 'bg-white/80 text-[#4A5A3A]'
                        }`}
                      >
                        <div className={`text-[9px] font-medium leading-tight ${isSelected ? 'text-white/80' : 'text-[#D880AD]'}`}>
                          {person.title}
                        </div>
                        <div className="truncate mt-0.5 font-medium">{person.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6 Столів */}
            {TABLES.map((table) => {
              if (activeTableId !== null && activeTableId !== table.id) return null;

              const halfLength = Math.ceil(table.guests.length / 2);
              const col1 = table.guests.slice(0, halfLength);
              const col2 = table.guests.slice(halfLength);

              return (
                <div
                  key={table.id}
                  className="bg-[#F8F5EC] border border-[#7A886A]/40 rounded-xl p-3 shadow-2xs transition-all"
                >
                  <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#7A886A]/20">
                    <h3 className="font-serif font-bold text-base text-[#4A5A3A]">
                      {table.title}
                    </h3>
                    <span className="text-[10px] bg-[#7A886A]/15 text-[#4A5A3A] font-semibold border border-[#7A886A]/30 px-2.5 py-0.5 rounded-full">
                      {table.guests.length} осіб
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-2 rounded-lg border border-[#7A886A]/20">
                    <div className="space-y-1">
                      {col1.map((name, i) => {
                        const isSelected = selectedGuest?.name === name;
                        return (
                          <div
                            key={i}
                            className={`px-1.5 py-0.5 rounded transition ${
                              isSelected
                                ? 'bg-[#D880AD] text-white font-bold shadow-2xs'
                                : 'text-[#4A5A3A]'
                            }`}
                          >
                            {name}
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-1">
                      {col2.map((name, i) => {
                        const isSelected = selectedGuest?.name === name;
                        return (
                          <div
                            key={i}
                            className={`px-1.5 py-0.5 rounded transition ${
                              isSelected
                                ? 'bg-[#D880AD] text-white font-bold shadow-2xs'
                                : 'text-[#4A5A3A]'
                            }`}
                          >
                            {name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* ПІДПИС «Юра та Іванка» */}
          <footer className="mt-6 text-center">
            <div className="font-serif italic text-2xl text-[#4A5A3A] tracking-wider">
              Юра та Іванка
            </div>
            <div className="text-[#D880AD] text-sm mt-0.5">♡</div>
          </footer>

        </div>
      </div>
    </div>
  );
}