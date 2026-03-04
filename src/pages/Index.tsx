import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CITIES = [
  {
    id: "nn",
    name: "Нижний Новгород",
    subtitle: "Основан в 1221 году",
    image: "https://cdn.poehali.dev/projects/d6f85955-8cfe-4b44-937a-8f96d0f8ace6/files/a6eb8932-8791-4d9f-9578-6abdf9ad499c.jpg",
    quests: 8,
    places: 24,
    weather: "−3°C · Снег",
    weatherIcon: "Snowflake",
    description: "Город на слиянии Волги и Оки — торговая столица России XIX века.",
    color: "#8B7355",
  },
  {
    id: "msk",
    name: "Москва",
    subtitle: "Основана в 1147 году",
    image: "https://cdn.poehali.dev/projects/d6f85955-8cfe-4b44-937a-8f96d0f8ace6/files/de08defb-4288-47f5-8869-b70c6d16779f.jpg",
    quests: 14,
    places: 52,
    weather: "−5°C · Ясно",
    weatherIcon: "Sun",
    description: "Столица России с тысячелетней историей, дворцами и соборами.",
    color: "#6B5B45",
  },
];

const QUEST_STOPS: Record<number, string[]> = {
  1: ["Дмитриевская башня", "Ивановская башня", "Часовая башня", "Тайницкая башня", "Северная башня", "Коромыслова башня"],
  2: ["Усадьба Рукавишниковых", "Дом Чатыгина", "Торговые ряды", "Особняк Сироткина", "Строгановская церковь"],
  3: ["Сенатская башня", "Мавзолей Ленина", "Собор Василия Блаженного", "Лобное место", "Спасская башня", "ГУМ", "Исторический музей", "Казанский собор"],
  4: ["Арбатская площадь", "Театр Вахтангова", "Дом Мельникова", "Музей Пушкина", "Кривоарбатский переулок", "Смоленская площадь", "Дом актёра"],
  5: ["Новодевичий монастырь", "Данилов монастырь", "Храм Христа Спасителя", "Донской монастырь", "Сретенский монастырь", "Зачатьевский монастырь", "Высоко-Петровский монастырь", "Богоявленский собор", "Успенский собор"],
};

const QUESTS = [
  { id: 1, city: "nn", title: "Кремль и его тайны", description: "Пройдите маршрут по стенам нижегородской крепости — одной из лучших сохранившихся в России.", duration: "2–3 ч", stops: 6, difficulty: "Лёгкий", done: 3, total: 6 },
  { id: 2, city: "nn", title: "Купеческая слобода", description: "Торговые дома и особняки XIX века в историческом центре города.", duration: "1.5 ч", stops: 5, difficulty: "Лёгкий", done: 0, total: 5 },
  { id: 3, city: "msk", title: "Красная площадь", description: "Сердце России сквозь века — от Ивана Грозного до наших дней.", duration: "3–4 ч", stops: 8, difficulty: "Средний", done: 8, total: 8 },
  { id: 4, city: "msk", title: "Арбат: прошлое и настоящее", description: "История самой известной пешеходной улицы Москвы, хранящей тайны и легенды.", duration: "2 ч", stops: 7, difficulty: "Лёгкий", done: 2, total: 7 },
  { id: 5, city: "msk", title: "Монастыри и соборы", description: "Духовные святыни столицы — монастыри, укрывшие историю семи веков.", duration: "4 ч", stops: 9, difficulty: "Сложный", done: 0, total: 9 },
];

const MAP_POINTS = [
  { id: 1, city: "nn", label: "Кремль", x: 38, y: 38, active: true },
  { id: 2, city: "nn", label: "Чкаловская лестница", x: 25, y: 60, active: false },
  { id: 3, city: "nn", label: "Рождественская", x: 58, y: 55, active: true },
  { id: 4, city: "nn", label: "Нижегородская ярмарка", x: 68, y: 35, active: false },
  { id: 5, city: "msk", label: "Красная площадь", x: 52, y: 42, active: true },
  { id: 6, city: "msk", label: "Арбат", x: 32, y: 55, active: false },
  { id: 7, city: "msk", label: "Новодевичий", x: 28, y: 72, active: true },
  { id: 8, city: "msk", label: "Кремль", x: 48, y: 35, active: true },
];

const FACTS = [
  { id: 1, city: "nn", text: "Нижегородский кремль — единственный из кремлей, который никогда не был взят врагом.", emoji: "🏰" },
  { id: 2, city: "nn", text: "Чкаловская лестница состоит из 560 ступеней и была построена к 800-летию города.", emoji: "🪜" },
  { id: 3, city: "msk", text: "Собор Василия Блаженного состоит из 11 церквей, объединённых общим основанием.", emoji: "⛪" },
  { id: 4, city: "msk", text: "Московский Кремль — самая большая действующая средневековая крепость в мире.", emoji: "🏯" },
  { id: 5, city: "nn", text: "В XIX веке Нижегородская ярмарка была крупнейшей в Европе — здесь проходило до 40% торговли России.", emoji: "🛒" },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "🏰", title: "Первый квест", desc: "Завершён первый маршрут", done: true },
  { id: 2, icon: "🗺️", title: "Исследователь", desc: "Посещено 10 мест", done: true },
  { id: 3, icon: "⭐", title: "Знаток истории", desc: "Завершено 5 квестов", done: false },
  { id: 4, icon: "🏆", title: "Мастер городов", desc: "Изучены оба города", done: false },
  { id: 5, icon: "📍", title: "Картограф", desc: "Отмечено 20 точек", done: false },
  { id: 6, icon: "🎖️", title: "Летописец", desc: "Прочитано 50 фактов", done: true },
];

const FEED = [
  { id: 1, type: "quest_done", text: "Завершили квест «Красная площадь»", time: "сегодня", city: "msk", emoji: "✅" },
  { id: 2, type: "fact", text: "Узнали новый факт о Нижегородском кремле", time: "вчера", city: "nn", emoji: "💡" },
  { id: 3, type: "achievement", text: "Получили достижение «Исследователь»", time: "3 дня назад", city: null, emoji: "🗺️" },
  { id: 4, type: "place", text: "Посетили Рождественскую улицу", time: "4 дня назад", city: "nn", emoji: "📍" },
];

type Tab = "cities" | "quests" | "map";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("cities");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [mapCity, setMapCity] = useState("nn");
  const [factIdx, setFactIdx] = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [selectedFact, setSelectedFact] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIdx((i) => (i + 1) % FACTS.length);
        setFactVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const filteredQuests = selectedCity ? QUESTS.filter((q) => q.city === selectedCity) : QUESTS;
  const mapPoints = MAP_POINTS.filter((p) => p.city === mapCity);
  const currentFact = FACTS[factIdx];

  return (
    <div className="min-h-screen bg-[#F5F3EF] font-sans flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative flex flex-col overflow-hidden bg-[#F5F3EF]">

        {/* FACT MODAL */}
        {selectedFact !== null && (
          <div className="absolute inset-0 z-60 flex items-end justify-center" style={{ zIndex: 60 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedFact(null)} />
            <div className="relative w-full bg-white rounded-t-3xl px-6 pt-6 pb-10 animate-slide-up">
              <div className="w-10 h-1 bg-[#E8E4DC] rounded-full mx-auto mb-6" />
              {(() => {
                const f = FACTS[selectedFact];
                const city = CITIES.find((c) => c.id === f.city);
                return (
                  <>
                    <div className="text-4xl mb-4">{f.emoji}</div>
                    <div className="text-xs font-semibold text-[#8B7355] uppercase tracking-widest mb-2">
                      {city?.name ?? "История"}
                    </div>
                    <p className="font-display text-xl text-[#1C1A16] leading-relaxed mb-6">{f.text}</p>
                    <button
                      onClick={() => setSelectedFact(null)}
                      className="w-full bg-[#1C1A16] text-white rounded-2xl py-3.5 font-semibold text-sm"
                    >
                      Понятно
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* PROFILE OVERLAY */}
        {showProfile && (
          <div className="absolute inset-0 z-50 bg-[#F5F3EF] animate-fade-in flex flex-col overflow-y-auto">
            <div className="px-5 pt-14 pb-4 flex items-center justify-between">
              <h2 className="font-display text-3xl text-[#1C1A16]">Профиль</h2>
              <button onClick={() => setShowProfile(false)} className="w-9 h-9 rounded-full bg-[#E8E4DC] flex items-center justify-center">
                <Icon name="X" size={16} className="text-[#6B6355]" />
              </button>
            </div>

            <div className="px-5 pb-8">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#8B7355] flex items-center justify-center text-xl text-white font-semibold">АИ</div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-xs">🔥</div>
                </div>
                <div>
                  <div className="font-semibold text-[#1C1A16] text-lg">Александр И.</div>
                  <div className="text-sm text-[#8B8070]">Исследователь истории</div>
                </div>
              </div>

              {/* Streak */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl px-4 py-3 flex items-center gap-3 mb-5">
                <div className="text-2xl">🔥</div>
                <div>
                  <div className="font-semibold text-[#1C1A16] text-sm">7 дней подряд</div>
                  <div className="text-xs text-[#8B8070]">Не прерывайте серию!</div>
                </div>
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < 5 ? "bg-amber-400" : i === 5 ? "bg-amber-300" : "bg-[#E8E4DC]"}`} />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ label: "Квестов", value: "4" }, { label: "Мест", value: "17" }, { label: "Фактов", value: "23" }].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-semibold text-[#1C1A16]">{s.value}</div>
                    <div className="text-xs text-[#8B8070] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Level progress */}
              <div className="bg-white rounded-2xl p-4 mb-5">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xs text-[#8B8070]">Текущий уровень</span>
                    <div className="font-semibold text-[#1C1A16] text-sm">Любопытный путник</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8B8070]">Следующий</span>
                    <div className="font-semibold text-[#8B7355] text-sm">Знаток</div>
                  </div>
                </div>
                <div className="h-2 bg-[#E8E4DC] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#A08B6A] rounded-full transition-all" style={{ width: "68%" }} />
                </div>
                <div className="text-xs text-[#8B8070] mt-1.5">68% · осталось 3 квеста</div>
              </div>

              {/* Feed */}
              <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Последние события</div>
              <div className="space-y-2 mb-5">
                {FEED.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="text-xl">{f.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#1C1A16] font-medium leading-tight">{f.text}</div>
                      <div className="text-xs text-[#8B8070] mt-0.5">{f.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Достижения</div>
              <div className="grid grid-cols-2 gap-3 pb-6">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.id} className={`rounded-2xl p-4 flex items-start gap-3 transition-all ${a.done ? "bg-white" : "bg-[#EDEBE6] opacity-50"}`}>
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
              const stops = QUEST_STOPS[q.id] ?? Array.from({ length: q.stops }, (_, i) => `Точка ${i + 1}`);
              const pct = q.total > 0 ? Math.round((q.done / q.total) * 100) : 0;
              const isDone = q.done === q.total && q.total > 0;
              return (
                <>
                  <div className="relative h-56 flex-shrink-0">
                    <img src={city.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
                    <button onClick={() => setSelectedQuest(null)} className="absolute top-12 left-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon name="ArrowLeft" size={16} className="text-white" />
                    </button>
                    {isDone && (
                      <div className="absolute top-12 right-5 bg-[#8B7355] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        ✓ Пройден
                      </div>
                    )}
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
                      <div className="bg-white rounded-2xl p-4 mb-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#1C1A16] font-medium">Прогресс маршрута</span>
                          <span className="text-[#8B7355] font-semibold">{q.done}/{q.total}</span>
                        </div>
                        <div className="h-2 bg-[#E8E4DC] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#A08B6A] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Маршрут</div>
                    <div className="mb-6">
                      {stops.map((stop, i) => (
                        <div key={i} className="flex items-start gap-3 py-3 border-b border-[#E8E4DC] last:border-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${i < q.done ? "bg-[#8B7355] text-white" : i === q.done ? "bg-[#1C1A16] text-white" : "bg-[#E8E4DC] text-[#8B8070]"}`}>
                            {i < q.done ? "✓" : i + 1}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-medium ${i < q.done ? "text-[#B0A898] line-through" : i === q.done ? "text-[#1C1A16]" : "text-[#6B6355]"}`}>
                              {stop}
                            </span>
                            {i === q.done && (
                              <div className="text-xs text-[#8B7355] mt-0.5 font-medium">← следующая точка</div>
                            )}
                          </div>
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
        <div className="flex items-center justify-between px-5 pt-14 pb-3 flex-shrink-0">
          <div>
            <div className="text-xs text-[#8B8070] font-medium tracking-wide uppercase">История городов</div>
            <h1 className="font-display text-2xl text-[#1C1A16] font-semibold leading-tight">
              {activeTab === "cities" && "Города"}
              {activeTab === "quests" && "Квесты"}
              {activeTab === "map" && "Карта"}
            </h1>
          </div>
          <button
            onClick={() => setShowProfile(true)}
            className="relative w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white text-sm font-semibold"
          >
            АИ
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#F5F3EF] flex items-center justify-center text-[7px]">🔥</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto pb-28">

          {/* CITIES TAB */}
          {activeTab === "cities" && (
            <div className="animate-fade-in">
              {/* Fact of the day */}
              <div
                className={`mx-5 mb-4 bg-[#1C1A16] rounded-2xl px-4 py-4 cursor-pointer active:scale-[0.98] transition-all ${factVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transition: "opacity 0.4s ease" }}
                onClick={() => setSelectedFact(factIdx)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl flex-shrink-0">{currentFact.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#8B7355] uppercase tracking-widest mb-1">Факт дня</div>
                    <p className="text-white text-sm leading-relaxed line-clamp-2">{currentFact.text}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-white/40 flex-shrink-0 mt-1" />
                </div>
                {/* dots */}
                <div className="flex gap-1 mt-3 justify-end">
                  {FACTS.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i === factIdx ? "w-4 bg-[#8B7355]" : "w-1 bg-white/20"}`} />
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div className="px-5 mb-1">
                <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Выберите город</div>
              </div>
              <div className="px-5 space-y-4">
                {CITIES.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => { setSelectedCity(city.id); setActiveTab("quests"); }}
                    className="relative rounded-3xl overflow-hidden h-52 cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <img src={city.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    {/* Weather badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                      <Icon name={city.weatherIcon} size={12} className="text-white" />
                      <span className="text-white text-xs font-medium">{city.weather}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-white/60 text-xs mb-1">{city.subtitle}</div>
                      <h2 className="font-display text-2xl font-semibold text-white mb-1">{city.name}</h2>
                      <p className="text-white/60 text-xs mb-3 leading-relaxed line-clamp-1">{city.description}</p>
                      <div className="flex gap-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">{city.quests} квестов</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">{city.places} мест</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active quests */}
              {QUESTS.filter((q) => q.done > 0 && q.done < q.total).length > 0 && (
                <div className="px-5 mt-6">
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
                          <div className="text-xs font-bold text-[#8B7355] bg-[#F0EBE3] px-2.5 py-1 rounded-full">{pct}%</div>
                        </div>
                        <div className="h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#A08B6A] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="text-xs text-[#8B8070] mt-2">{q.done} из {q.total} точек пройдено</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* All facts strip */}
              <div className="mt-6 px-5">
                <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Исторические факты</div>
                <div className="space-y-2">
                  {FACTS.map((f, idx) => {
                    const city = CITIES.find((c) => c.id === f.city);
                    return (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFact(idx)}
                        className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        <div className="text-xl">{f.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-[#8B7355] font-medium mb-0.5">{city?.name}</div>
                          <div className="text-sm text-[#1C1A16] leading-snug line-clamp-2">{f.text}</div>
                        </div>
                        <Icon name="ChevronRight" size={14} className="text-[#C4B89A] flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-2" />
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
                  const inProgress = q.done > 0 && !isDone;
                  return (
                    <div key={q.id} onClick={() => setSelectedQuest(q.id)} className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="relative h-28">
                        <img src={city.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {isDone && <div className="bg-[#8B7355] text-white text-xs font-bold px-2.5 py-1 rounded-full">✓ Пройден</div>}
                          {inProgress && <div className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">В процессе</div>}
                        </div>
                        <div className="absolute bottom-3 left-4 text-white/60 text-xs">{city.name}</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[#1C1A16] mb-1">{q.title}</h3>
                        <p className="text-xs text-[#8B8070] mb-3 leading-relaxed line-clamp-2">{q.description}</p>
                        <div className="flex items-center gap-3 text-xs text-[#8B8070] mb-3">
                          <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{q.duration}</span>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={12} />{q.stops} мест</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${q.difficulty === "Лёгкий" ? "bg-green-50 text-green-700" : q.difficulty === "Средний" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>
                            {q.difficulty}
                          </span>
                        </div>
                        {q.done > 0 && (
                          <div>
                            <div className="h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#A08B6A] rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="text-xs text-[#8B8070] mt-1">{q.done}/{q.total} точек</div>
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
                  <button key={c.id} onClick={() => setMapCity(c.id)} className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${mapCity === c.id ? "bg-[#1C1A16] text-white" : "bg-[#E8E4DC] text-[#6B6355]"}`}>
                    {c.id === "nn" ? "Н. Новгород" : "Москва"}
                  </button>
                ))}
              </div>

              {/* City info strip */}
              {(() => {
                const city = CITIES.find((c) => c.id === mapCity)!;
                return (
                  <div className="mx-5 mb-4 bg-white rounded-2xl px-4 py-3 flex items-center gap-3">
                    <Icon name={city.weatherIcon} size={18} className="text-[#8B7355]" />
                    <div>
                      <div className="text-sm font-semibold text-[#1C1A16]">{city.weather}</div>
                      <div className="text-xs text-[#8B8070]">{city.subtitle}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-xs font-semibold text-[#8B7355]">{mapPoints.filter(p => p.active).length}/{mapPoints.length}</div>
                      <div className="text-xs text-[#8B8070]">мест посещено</div>
                    </div>
                  </div>
                );
              })()}

              {/* Map */}
              <div className="mx-5 rounded-3xl overflow-hidden relative" style={{ height: 280, background: "#DDD8CB" }}>
                <img src={CITIES.find((c) => c.id === mapCity)!.image} className="w-full h-full object-cover opacity-25" />
                <div className="absolute inset-0" style={{ background: "rgba(196,188,169,0.6)" }} />
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[20, 40, 60, 80].map((v) => (
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="100" stroke="#5A4A35" strokeWidth="0.5" />
                      <line x1="0" y1={v} x2="100" y2={v} stroke="#5A4A35" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {mapPoints.filter(p => p.active).map((p, i, arr) => {
                    if (i === 0) return null;
                    const prev = arr[i - 1];
                    return <line key={p.id} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y} stroke="#8B7355" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />;
                  })}
                </svg>

                {mapPoints.map((p) => (
                  <div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}>
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${p.active ? "bg-[#8B7355]" : "bg-[#C4B89A]"}`} />
                      <div className={`mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-sm ${p.active ? "bg-[#1C1A16] text-white" : "bg-white/85 text-[#6B5B45]"}`}>
                        {p.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="px-5 flex gap-4 mt-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-[#8B8070]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" /> Посещено
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#8B8070]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C4B89A]" /> Не посещено
                </div>
              </div>

              <div className="px-5">
                <div className="text-xs font-semibold text-[#8B8070] uppercase tracking-widest mb-3">Все точки</div>
                <div className="space-y-2">
                  {mapPoints.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${p.active ? "bg-[#8B7355]" : "bg-[#C4B89A]"}`} />
                      <span className="text-sm text-[#1C1A16] font-medium flex-1">{p.label}</span>
                      {p.active
                        ? <span className="text-xs text-[#8B7355] font-medium">Посещено</span>
                        : <span className="text-xs text-[#C4B89A]">Не посещено</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-4" />
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
