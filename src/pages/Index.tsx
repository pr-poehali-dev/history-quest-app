import { useState } from "react";
import Icon from "@/components/ui/icon";

const CITIES = [
  {
    id: "nn",
    name: "Нижний Новгород",
    subtitle: "Основан в 1221 году",
    image: "https://cdn.poehali.dev/projects/d6f85955-8cfe-4b44-937a-8f96d0f8ace6/files/a6eb8932-8791-4d9f-9578-6abdf9ad499c.jpg",
    quests: 8,
    places: 24,
  },
  {
    id: "msk",
    name: "Москва",
    subtitle: "Основана в 1147 году",
    image: "https://cdn.poehali.dev/projects/d6f85955-8cfe-4b44-937a-8f96d0f8ace6/files/de08defb-4288-47f5-8869-b70c6d16779f.jpg",
    quests: 14,
    places: 52,
  },
];

const QUESTS = [
  { id: 1, city: "nn", title: "Кремль и его тайны", description: "Пройдите маршрут по стенам нижегородской крепости", duration: "2–3 ч", stops: 6, difficulty: "Лёгкий", done: 3, total: 6 },
  { id: 2, city: "nn", title: "Купеческая слобода", description: "Торговые дома и особняки XIX века", duration: "1.5 ч", stops: 5, difficulty: "Лёгкий", done: 0, total: 5 },
  { id: 3, city: "msk", title: "Красная площадь", description: "Сердце России сквозь века", duration: "3–4 ч", stops: 8, difficulty: "Средний", done: 8, total: 8 },
  { id: 4, city: "msk", title: "Арбат: прошлое и настоящее", description: "История самой известной пешеходной улицы Москвы", duration: "2 ч", stops: 7, difficulty: "Лёгкий", done: 2, total: 7 },
  { id: 5, city: "msk", title: "Монастыри и соборы", description: "Духовные святыни столицы", duration: "4 ч", stops: 9, difficulty: "Сложный", done: 0, total: 9 },
];

const MAP_POINTS = [
  { id: 1, city: "nn", label: "Кремль", x: 38, y: 38, active: true },
  { id: 2, city: "nn", label: "Чкаловская лестница", x: 25, y: 60, active: false },
  { id: 3, city: "nn", label: "Рождественская", x: 58, y: 55, active: true },
  { id: 4, city: "msk", label: "Красная площадь", x: 52, y: 42, active: true },
  { id: 5, city: "msk", label: "Арбат", x: 32, y: 55, active: false },
  { id: 6, city: "msk", label: "Новодевичий", x: 28, y: 72, active: true },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "🏰", title: "Первый квест", desc: "Завершён первый маршрут", done: true },
  { id: 2, icon: "🗺️", title: "Исследователь", desc: "Посещено 10 мест", done: true },
  { id: 3, icon: "⭐", title: "Знаток истории", desc: "Завершено 5 квестов", done: false },
  { id: 4, icon: "🏆", title: "Мастер городов", desc: "Изучены оба города", done: false },
  { id: 5, icon: "📍", title: "Картограф", desc: "Отмечено 20 точек", done: false },
  { id: 6, icon: "🎖️", title: "Летописец", desc: "Прочитано 50 фактов", done: true },
];

type Tab = "cities" | "quests" | "map";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("cities");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [mapCity, setMapCity] = useState("nn");

  const filteredQuests = selectedCity ? QUESTS.filter((q) => q.city === selectedCity) : QUESTS;
  const mapPoints = MAP_POINTS.filter((p) => p.city === mapCity);

  return (
    <div className="min-h-screen bg-[#F5F3EF] font-sans flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative flex flex-col overflow-hidden bg-[#F5F3EF]">

        {/* PROFILE OVERLAY */}
        {showProfile && (
          <div className="absolute inset-0 z-50 bg-[#F5F3EF] animate-fade-in flex flex-col overflow-y-auto">
            <div className="px-5 pt-14 pb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl text-[#1C1A16]">Профиль</h2>
              <button onClick={() => setShowProfile(false)} className="w-9 h-9 rounded-full bg-[#E8E4DC] flex items-center justify-center">
                <Icon name="X" size={16} className="text-[#6B6355]" />
              </button>
            </div>

            <div className="px-5 pb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#8B7355] flex items-center justify-center text-xl text-white font-semibold">АИ</div>
                <div>
                  <div className="font-semibold text-[#1C1A16] text-lg">Александр И.</div>
                  <div className="text-sm text-[#8B8070]">Исследователь истории</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ label: "Квестов", value: "4" }, { label: "Мест", value: "17" }, { label: "Дней", value: "12" }].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-semibold text-[#1C1A16]">{s.value}</div>
                    <div className="text-xs text-[#8B8070] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#1C1A16] font-medium">До уровня «Знаток»</span>
                  <span className="text-[#8B7355] font-semibold">68%</span>
                </div>
                <div className="h-2 bg-[#E8E4DC] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "68%" }} />
                </div>
              </div>

              <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Достижения</div>
              <div className="grid grid-cols-2 gap-3 pb-6">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.id} className={`rounded-2xl p-4 flex items-start gap-3 ${a.done ? "bg-white" : "bg-[#EDEBE6] opacity-50"}`}>
                    <div className="text-2xl leading-none mt-0.5">{a.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-[#1C1A16] leading-tight">{a.title}</div>
                      <div className="text-xs text-[#8B8070] mt-0.5 leading-tight">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUEST DETAIL OVERLAY */}
        {selectedQuest !== null && (
          <div className="absolute inset-0 z-40 bg-[#F5F3EF] animate-slide-up flex flex-col">
            {(() => {
              const q = QUESTS.find((x) => x.id === selectedQuest)!;
              const city = CITIES.find((c) => c.id === q.city)!;
              const pct = q.total > 0 ? Math.round((q.done / q.total) * 100) : 0;
              const isDone = q.done === q.total && q.total > 0;
              return (
                <>
                  <div className="relative h-56 flex-shrink-0">
                    <img src={city.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/65" />
                    <button onClick={() => setSelectedQuest(null)} className="absolute top-12 left-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon name="ArrowLeft" size={16} className="text-white" />
                    </button>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="text-xs text-white/60 mb-1">{city.name}</div>
                      <h2 className="font-display text-2xl text-white font-semibold">{q.title}</h2>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 py-5">
                    <p className="text-[#6B6355] text-sm mb-5 leading-relaxed">{q.description}</p>

                    <div className="flex gap-3 mb-5">
                      {[{ icon: "Clock", val: q.duration }, { icon: "MapPin", val: `${q.stops} мест` }, { icon: "BarChart2", val: q.difficulty }].map((item) => (
                        <div key={item.icon} className="flex-1 bg-white rounded-2xl px-3 py-3 flex flex-col items-center gap-1.5">
                          <Icon name={item.icon} size={16} className="text-[#8B7355]" />
                          <span className="text-xs font-medium text-[#1C1A16] text-center">{item.val}</span>
                        </div>
                      ))}
                    </div>

                    {q.done > 0 && (
                      <div className="mb-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#1C1A16] font-medium">Прогресс</span>
                          <span className="text-[#8B7355] font-semibold">{q.done}/{q.total}</span>
                        </div>
                        <div className="h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden">
                          <div className="h-full bg-[#8B7355] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Маршрут</div>
                    <div className="space-y-0 mb-6">
                      {Array.from({ length: q.stops }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E8E4DC] last:border-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${i < q.done ? "bg-[#8B7355] text-white" : "bg-[#E8E4DC] text-[#8B8070]"}`}>
                            {i < q.done ? "✓" : i + 1}
                          </div>
                          <span className={`text-sm ${i < q.done ? "text-[#8B8070] line-through" : "text-[#1C1A16]"}`}>Точка маршрута {i + 1}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-[#1C1A16] text-white rounded-2xl py-4 font-semibold text-sm active:scale-95 transition-transform">
                      {isDone ? "Пройден ✓" : q.done > 0 ? "Продолжить квест" : "Начать квест"}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4 flex-shrink-0">
          <div>
            <div className="text-xs text-[#8B8070] font-medium tracking-wide uppercase">История городов</div>
            <h1 className="font-display text-2xl text-[#1C1A16] font-semibold">
              {activeTab === "cities" && "Города"}
              {activeTab === "quests" && "Квесты"}
              {activeTab === "map" && "Карта"}
            </h1>
          </div>
          <button onClick={() => setShowProfile(true)} className="w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white text-sm font-semibold">
            АИ
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto pb-28">

          {/* CITIES TAB */}
          {activeTab === "cities" && (
            <div className="px-5 space-y-4 animate-fade-in">
              <div className="text-sm text-[#8B8070] mb-1">Выберите город для изучения</div>
              {CITIES.map((city) => (
                <div
                  key={city.id}
                  onClick={() => { setSelectedCity(city.id); setActiveTab("quests"); }}
                  className="relative rounded-3xl overflow-hidden h-52 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <img src={city.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-white/60 text-xs mb-1">{city.subtitle}</div>
                    <h2 className="font-display text-2xl font-semibold text-white mb-3">{city.name}</h2>
                    <div className="flex gap-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">{city.quests} квестов</div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">{city.places} мест</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Активные квесты</div>
                {QUESTS.filter((q) => q.done > 0 && q.done < q.total).map((q) => {
                  const city = CITIES.find((c) => c.id === q.city)!;
                  const pct = Math.round((q.done / q.total) * 100);
                  return (
                    <div key={q.id} onClick={() => setSelectedQuest(q.id)} className="bg-white rounded-2xl p-4 mb-3 cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-xs text-[#8B8070] mb-0.5">{city.name}</div>
                          <div className="font-semibold text-[#1C1A16] text-sm">{q.title}</div>
                        </div>
                        <div className="text-xs font-semibold text-[#8B7355] bg-[#F0EBE3] px-2 py-1 rounded-full">{pct}%</div>
                      </div>
                      <div className="h-1 bg-[#E8E4DC] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B7355] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTS TAB */}
          {activeTab === "quests" && (
            <div className="animate-fade-in">
              <div className="px-5 flex gap-2 mb-4 overflow-x-auto pb-1">
                <button onClick={() => setSelectedCity(null)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCity ? "bg-[#1C1A16] text-white" : "bg-[#E8E4DC] text-[#6B6355]"}`}>
                  Все
                </button>
                {CITIES.map((c) => (
                  <button key={c.id} onClick={() => setSelectedCity(c.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCity === c.id ? "bg-[#1C1A16] text-white" : "bg-[#E8E4DC] text-[#6B6355]"}`}>
                    {c.id === "nn" ? "Н. Новгород" : "Москва"}
                  </button>
                ))}
              </div>

              <div className="px-5 space-y-3">
                {filteredQuests.map((q) => {
                  const city = CITIES.find((c) => c.id === q.city)!;
                  const pct = q.total > 0 ? Math.round((q.done / q.total) * 100) : 0;
                  const isDone = q.done === q.total && q.total > 0;
                  return (
                    <div key={q.id} onClick={() => setSelectedQuest(q.id)} className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="relative h-28">
                        <img src={city.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
                        {isDone && (
                          <div className="absolute top-3 right-3 bg-[#8B7355] text-white text-xs font-semibold px-2 py-1 rounded-full">Пройден</div>
                        )}
                        <div className="absolute bottom-3 left-4 text-white/60 text-xs">{city.name}</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[#1C1A16] mb-1">{q.title}</h3>
                        <p className="text-xs text-[#8B8070] mb-3 leading-relaxed">{q.description}</p>
                        <div className="flex items-center gap-3 text-xs text-[#8B8070] mb-3">
                          <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{q.duration}</span>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={12} />{q.stops} мест</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${q.difficulty === "Лёгкий" ? "bg-green-50 text-green-700" : q.difficulty === "Средний" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>
                            {q.difficulty}
                          </span>
                        </div>
                        {q.done > 0 && (
                          <div className="h-1 bg-[#E8E4DC] rounded-full overflow-hidden">
                            <div className="h-full bg-[#8B7355] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MAP TAB */}
          {activeTab === "map" && (
            <div className="animate-fade-in">
              <div className="px-5 flex gap-2 mb-4">
                {CITIES.map((c) => (
                  <button key={c.id} onClick={() => setMapCity(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mapCity === c.id ? "bg-[#1C1A16] text-white" : "bg-[#E8E4DC] text-[#6B6355]"}`}>
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="mx-5 rounded-3xl overflow-hidden relative" style={{ height: 320, background: "#DDD8CB" }}>
                <img src={CITIES.find((c) => c.id === mapCity)!.image} className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0" style={{ background: "rgba(200,192,175,0.5)" }} />
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[20, 40, 60, 80].map((v) => (
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="100" stroke="#5A4A35" strokeWidth="0.4" />
                      <line x1="0" y1={v} x2="100" y2={v} stroke="#5A4A35" strokeWidth="0.4" />
                    </g>
                  ))}
                </svg>

                {mapPoints.map((p) => (
                  <div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}>
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${p.active ? "bg-[#8B7355]" : "bg-[#B8A990]"}`} />
                      <div className={`mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-sm ${p.active ? "bg-[#1C1A16] text-white" : "bg-white/85 text-[#6B5B45]"}`}>
                        {p.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 mt-5">
                <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Точки на карте</div>
                <div className="space-y-2">
                  {mapPoints.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${p.active ? "bg-[#8B7355]" : "bg-[#C4B89A]"}`} />
                      <span className="text-sm text-[#1C1A16] font-medium">{p.label}</span>
                      {p.active && <span className="ml-auto text-xs text-[#8B7355] font-medium">Посещено</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 pointer-events-none">
          <div className="mx-4 mb-6 bg-white rounded-[28px] shadow-xl shadow-black/10 px-2 py-2 flex pointer-events-auto">
            {([
              { id: "cities" as Tab, icon: "Building2", label: "Города" },
              { id: "quests" as Tab, icon: "ScrollText", label: "Квесты" },
              { id: "map" as Tab, icon: "Map", label: "Карта" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[20px] transition-all ${activeTab === tab.id ? "bg-[#1C1A16]" : "bg-transparent"}`}
              >
                <Icon name={tab.icon} size={20} className={activeTab === tab.id ? "text-white" : "text-[#8B8070]"} />
                <span className={`text-[10px] font-medium ${activeTab === tab.id ? "text-white" : "text-[#8B8070]"}`}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}