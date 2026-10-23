
"use client";

import { useEffect, useState, type FormEvent } from "react";

export default function Home() {
  const [stage, setStage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [rsvpChoice, setRsvpChoice] = useState<"yes" | "no" | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const photos = [
    "/photo1.png",
    "/photo2.png",
    "/photo3.png",
    "/photo4.png",
    "/photo5.png",
    "/photo6.png",
  ];

  useEffect(() => {
    const weddingDate = new Date("2026-10-16T20:00:00+03:00").getTime();

    const updateCountdown = () => {
      const difference = Math.max(0, weddingDate - Date.now());

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage !== 1) return;

    const introTimer = window.setTimeout(() => {
      setStage(2);
    }, 4500);

    return () => window.clearTimeout(introTimer);
  }, [stage]);

  const toggleMusic = async () => {
    const audio = document.getElementById(
      "wedding-music"
    ) as HTMLAudioElement | null;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setMusicPlaying(true);
      } else {
        audio.pause();
        setMusicPlaying(false);
      }
    } catch {
      setMusicPlaying(false);
    }
  };

  const sendWhatsAppWish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message =
      `تهنئة من: ${guestName.trim()}\n` +
      `الرسالة: ${guestMessage.trim()}`;

    const whatsappUrl =
      `https://wa.me/201129043616?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main
      dir="rtl"
      className="wedding-page relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf2ff] via-white to-[#dce9ff] px-2 py-8 text-center text-blue-950"
    >
      <style jsx global>{`
        @keyframes elegantReveal {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes softGlow {
          0%, 100% {
            box-shadow: 0 12px 35px rgba(30,64,175,.12),
              0 0 0 rgba(212,175,55,0);
          }
          50% {
            box-shadow: 0 16px 42px rgba(30,64,175,.18),
              0 0 18px rgba(212,175,55,.13);
          }
        }

        @keyframes goldShimmer {
          0% { background-position: 180% center; }
          100% { background-position: -180% center; }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes coverRise {
          from { opacity: 0; transform: translateY(28px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes coverFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes coverOrbit {
          0%, 100% { transform: scale(.98) rotate(0deg); opacity: .55; }
          50% { transform: scale(1.015) rotate(1deg); opacity: 1; }
        }

        @keyframes coverSparkle {
          0%, 100% {
            opacity: .35;
            transform: translateY(0) rotate(0deg) scale(.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-9px) rotate(18deg) scale(1.12);
          }
        }

        @keyframes coverRule {
          from { transform: scaleX(0); opacity: .2; }
          to { transform: scaleX(1); opacity: 1; }
        }

        .wedding-page {
          isolation: isolate;
        }

        .wedding-page::before,
        .wedding-page::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: -1;
          width: 240px;
          height: 240px;
          border-radius: 9999px;
          filter: blur(55px);
          opacity: .45;
        }

        .wedding-page::before {
          top: 3%;
          right: -130px;
          background: rgba(147,197,253,.6);
        }

        .wedding-page::after {
          top: 35%;
          left: -150px;
          background: rgba(226,205,145,.28);
        }

        .elegant-reveal {
          animation: elegantReveal .8s ease-out both;
        }

        .elegant-reveal-delay-1 {
          animation: elegantReveal .85s ease-out .12s both;
        }

        .elegant-reveal-delay-2 {
          animation: elegantReveal .9s ease-out .24s both;
        }

        .elegant-reveal-delay-3 {
          animation: elegantReveal .9s ease-out .36s both;
        }

        .video-luxury-frame {
          position: relative;
          padding: 4px;
          border: 1px solid rgba(212,175,55,.72);
          border-radius: 25px;
          background: linear-gradient(
            135deg,
            #fff9df 0%,
            #d4af37 22%,
            #ffffff 43%,
            #c9a227 67%,
            #fff8d9 100%
          );
          background-size: 220% auto;
          animation: goldShimmer 8s linear infinite,
            softGlow 5s ease-in-out infinite;
        }

        .video-luxury-frame video {
          border: 2px solid rgba(255,255,255,.95);
          border-radius: 21px;
        }

        .gold-heading {
          background: linear-gradient(
            90deg,
            #1e3a8a 0%,
            #315bb5 35%,
            #b08d2e 50%,
            #315bb5 65%,
            #1e3a8a 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: goldShimmer 9s linear infinite;
        }

        .luxury-card {
          border: 1px solid rgba(191,163,83,.4);
          box-shadow: 0 12px 32px rgba(30,64,175,.08);
          animation: elegantReveal .75s ease-out both;
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .luxury-card:hover {
          box-shadow: 0 16px 38px rgba(30,64,175,.13);
        }

        .luxury-button {
          position: relative;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease,
            background-color .25s ease;
        }

        .luxury-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(30,64,175,.2);
        }

        .luxury-button:active {
          transform: scale(.98);
        }

        .floating-motif {
          animation: gentleFloat 5s ease-in-out infinite;
        }

        .photo-card {
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .photo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(30,64,175,.16);
        }

        .invitation-cover {
          animation: coverRise 1.1s cubic-bezier(.2,.75,.25,1) both,
            softGlow 5s ease-in-out 1s infinite;
        }

        .cover-orbit {
          animation: coverOrbit 7s ease-in-out infinite;
        }

        .cover-orbit-delay {
          animation-delay: -3.5s;
        }

        .cover-sparkle {
          animation: coverSparkle 3.2s ease-in-out infinite;
        }

        .cover-sparkle-delay {
          animation-delay: .7s;
        }

        .cover-sparkle-delay-2 {
          animation-delay: 1.4s;
        }

        .cover-line,
        .cover-title,
        .cover-subtitle,
        .cover-footer {
          animation: coverFade 1s ease-out both;
        }

        .cover-title { animation-delay: .2s; }
        .cover-subtitle { animation-delay: .45s; }

        .cover-names {
          animation: coverRise 1.1s ease-out .6s both;
        }

        .cover-footer { animation-delay: .8s; }

        .cover-rule {
          transform-origin: center;
          animation: coverRule 1.1s ease-out .35s both;
        }

        .cover-diamond {
          animation: coverSparkle 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .wedding-page *,
          .wedding-page *::before,
          .wedding-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute left-5 top-20 z-0 text-2xl text-[#c5a44b]/50 floating-motif">
        ✧
      </div>
      <div className="pointer-events-none absolute right-6 top-64 z-0 text-xl text-[#c5a44b]/40 floating-motif">
        ✦
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        {stage === 1 && (
          <section className="flex min-h-[78vh] items-center justify-center py-10">
            <div className="invitation-cover relative w-full overflow-hidden rounded-[2rem] border border-[#d6b85a]/70 bg-gradient-to-b from-white via-[#f5f8ff] to-[#e4edff] px-5 py-14 shadow-2xl sm:px-10 sm:py-20">
              <div className="pointer-events-none absolute inset-4 rounded-[1.6rem] border border-[#d6b85a]/45" />
              <div className="pointer-events-none absolute left-8 top-8 text-3xl text-[#c5a44b] cover-sparkle">
                ✧
              </div>
              <div className="pointer-events-none absolute right-8 top-16 text-2xl text-[#c5a44b] cover-sparkle cover-sparkle-delay">
                ✦
              </div>
              <div className="pointer-events-none absolute bottom-16 left-10 text-2xl text-[#c5a44b] cover-sparkle cover-sparkle-delay-2">
                ✧
              </div>
              <div className="pointer-events-none absolute bottom-10 right-10 text-3xl text-[#c5a44b] cover-sparkle">
                ✦
              </div>

              <div className="cover-line text-xs tracking-[0.35em] text-blue-700">
                WEDDING INVITATION
              </div>

              <div className="cover-rule mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c5a44b]" />
                <span className="cover-diamond text-xl text-[#b08d2e]">✧</span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c5a44b]" />
              </div>

              <p className="cover-title mt-7 text-sm text-blue-700">
                بكل الحب والسعادة
              </p>

              <h1 className="gold-heading cover-title mt-3 text-4xl font-serif sm:text-5xl">
                دعوة زفاف
              </h1>

              <p className="cover-subtitle mt-5 leading-8 text-blue-800">
                يسرّنا أن نشارككم أجمل لحظات العمر
              </p>

              <div className="cover-names mt-8">
                <div className="cover-orbit mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#d6b85a]/70 bg-white/70 shadow-lg">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d6b85a]/40 text-4xl text-[#b08d2e]">
                    ♡
                  </div>
                </div>

                <h2 className="gold-heading mt-6 text-3xl font-serif sm:text-4xl">
                  محمود <span className="text-[#b08d2e]">&</span> مريم
                </h2>
              </div>

              <div className="cover-rule mx-auto mt-8 flex max-w-xs items-center justify-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c5a44b]" />
                <span className="text-[#b08d2e]">✧</span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c5a44b]" />
              </div>

              <p className="cover-footer mt-6 text-sm tracking-wide text-blue-600">
                بكل الحب تبدأ أجمل الحكايات
              </p>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-blue-400">
                <span className="loading-dot">✦</span>
                <span className="loading-dot loading-dot-delay">✦</span>
                <span className="loading-dot">✦</span>
              </div>
              <p className="mt-3 text-xs text-blue-500">
                لحظات ونبدأ الاحتفال
              </p>
            </div>
          </section>
        )}

        {stage >= 2 && (
          <section>
            <div className="mb-5 elegant-reveal">
              <p className="text-xs tracking-[0.25em] text-blue-700">
                OUR SPECIAL DAY
              </p>

              <div className="mx-auto mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#c5a44b]" />
                <span className="text-[#b08d2e]">✧</span>
                <span className="h-px w-10 bg-[#c5a44b]" />
              </div>

              <h1 className="gold-heading mt-2 text-3xl font-serif sm:text-4xl">
                Mahmoud <span>&</span> Mariam
              </h1>

              <p className="mt-3 text-blue-700">
                يسعدنا أن تكونوا جزءًا من أجمل أيام حياتنا
              </p>
            </div>

            <div className="video-luxury-frame elegant-reveal-delay-1">
              <video
                className="block w-full"
                src="/second.mp4"
                autoPlay
                loop
                playsInline
                controls
              />
            </div>

            {stage === 2 && (
              <button
                onClick={() => setStage(3)}
                className="luxury-button mt-5 rounded-full border border-[#d6b85a] bg-gradient-to-l from-blue-950 via-blue-800 to-blue-950 px-10 py-3 text-lg text-white shadow-lg elegant-reveal-delay-2"
              >
                ✧ تفاصيل الفرح ♥
              </button>
            )}

            {stage === 3 && (
              <div className="mt-6 space-y-5">
                <div className="luxury-card rounded-3xl bg-white/95 p-6 elegant-reveal">
                  <div className="floating-motif text-4xl">💍</div>

                  <div className="mx-auto my-3 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-[#c5a44b]" />
                    <span className="text-sm text-[#b08d2e]">✧</span>
                    <span className="h-px w-8 bg-[#c5a44b]" />
                  </div>

                  <h2 className="gold-heading mt-3 text-2xl font-serif">
                    Mahmoud & Mariam
                  </h2>

                  <p className="mt-3 leading-8 text-gray-600">
                    بقلوب مليئة بالفرح والسعادة،
                    <br />
                    نتشرف بدعوتكم لمشاركتنا ليلة العمر.
                  </p>

                  <div className="my-5 border-y border-[#d9c58a]/60 py-5">
                    <p className="text-sm text-blue-600">موعدنا مع الفرحة</p>
                    <p className="mt-2 text-xl font-semibold text-blue-950">
                      الجمعة، 16 أكتوبر 2026
                    </p>
                    <p className="mt-2 text-lg">الساعة 8 مساءً</p>
                  </div>

                  <div className="floating-motif text-3xl">📍</div>
                  <h3 className="mt-2 text-xl font-semibold">قاعة الماسة</h3>
                  <p className="mt-2 text-gray-600">دمنهور بجوار الموقف</p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=قاعة+الماسة+دمنهور+بجوار+الموقف"
                    target="_blank"
                    rel="noreferrer"
                    className="luxury-button mt-5 inline-block rounded-full border border-[#c5a44b] px-6 py-2 text-blue-800 hover:bg-blue-50"
                  >
                    افتح موقع القاعة على الخريطة
                  </a>
                </div>

                <div className="luxury-card rounded-3xl border border-[#d6b85a]/60 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 p-6 text-white">
                  <div className="text-xl text-[#e7cf83]">✧ ليلة العمر ✧</div>
                  <h3 className="mt-2 text-xl">الوقت المتبقي على ليلة العمر</h3>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {[
                      { label: "يوم", value: timeLeft.days },
                      { label: "ساعة", value: timeLeft.hours },
                      { label: "دقيقة", value: timeLeft.minutes },
                      { label: "ثانية", value: timeLeft.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/15 bg-white/10 p-2 transition duration-300 hover:bg-white/15"
                      >
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="mt-1 text-xs text-blue-100">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-sm text-blue-100">
                    حضوركم يزيد فرحتنا ♥
                  </p>
                </div>

                <div className="luxury-card rounded-3xl bg-white/95 p-6">
                  <div className="floating-motif text-3xl">💌</div>
                  <h3 className="mt-3 text-2xl font-serif text-blue-900">
                    هل ستشاركوننا فرحتنا؟
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    يسعدنا معرفة اختياركم
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setRsvpChoice("yes")}
                      aria-pressed={rsvpChoice === "yes"}
                      className={`luxury-button rounded-full border-2 px-5 py-3 font-semibold ${
                        rsvpChoice === "yes"
                          ? "border-blue-900 bg-blue-900 text-white"
                          : "border-blue-700 bg-white text-blue-900 hover:bg-blue-50"
                      }`}
                    >
                      ✓ هحضر
                    </button>

                    <button
                      type="button"
                      onClick={() => setRsvpChoice("no")}
                      aria-pressed={rsvpChoice === "no"}
                      className={`luxury-button rounded-full border-2 px-5 py-3 font-semibold ${
                        rsvpChoice === "no"
                          ? "border-gray-600 bg-gray-600 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      أعتذر عن الحضور
                    </button>
                  </div>

                  {rsvpChoice !== null && (
                    <p
                      role="status"
                      className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-900 elegant-reveal"
                    >
                      {rsvpChoice === "yes"
                        ? "شكرًا لك، نتمنى نشوفك ونفرح بوجودك ♥"
                        : "شكرًا لإبلاغنا، نتمنى لك كل الخير ♥"}
                    </p>
                  )}
                </div>

                <div className="luxury-card rounded-3xl bg-white/95 p-6">
                  <div className="floating-motif text-3xl">💌</div>
                  <h3 className="mt-3 text-2xl font-serif text-blue-900">
                    اكتب تهنئتك للعروسين
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    اترك كلمة جميلة لمحمود ومريم، وستُفتح رسالتك في واتساب لإرسالها مباشرة.
                  </p>

                  <form
                    className="mt-5 space-y-4 text-right"
                    onSubmit={sendWhatsAppWish}
                  >
                    <label className="block text-sm font-semibold text-blue-900">
                      اسمك
                      <input
                        type="text"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        required
                        maxLength={80}
                        placeholder="اكتب اسمك هنا"
                        className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block text-sm font-semibold text-blue-900">
                      رسالة التهنئة
                      <textarea
                        value={guestMessage}
                        onChange={(event) => setGuestMessage(event.target.value)}
                        required
                        maxLength={1000}
                        rows={4}
                        placeholder="اكتب تهنئتك الجميلة للعروسين..."
                        className="mt-2 w-full resize-y rounded-xl border border-blue-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <button
                      type="submit"
                      className="luxury-button w-full rounded-full border border-[#d6b85a] bg-gradient-to-l from-blue-950 via-blue-800 to-blue-950 px-6 py-3 font-semibold text-white shadow-md"
                    >
                      إرسال التهنئة للعروسين 💙
                    </button>
                  </form>
                </div>

                <div className="luxury-card rounded-3xl bg-white/95 p-5">
                  <div className="mx-auto flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-[#c5a44b]" />
                    <span className="text-sm text-[#b08d2e]">✧</span>
                    <span className="h-px w-8 bg-[#c5a44b]" />
                  </div>

                  <h3 className="mt-2 text-2xl font-serif text-blue-900">
                    ألبوم ذكرياتنا ♥
                  </h3>
                  <p className="mt-2 text-sm text-blue-600">
                    لحظات جميلة نشاركها معكم
                  </p>

                  <div
                    dir="ltr"
                    className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
                  >
                    {photos.map((photo, index) => (
                      <div
                        key={photo}
                        className="photo-card w-64 flex-none snap-center"
                      >
                        <img
                          src={photo}
                          onClick={() => {
                            setPhotoIndex(index);
                            setSelectedPhoto(index);
                          }}
                          alt={`Wedding memory ${index + 1}`}
                          className="h-72 w-full cursor-pointer rounded-2xl border-2 border-[#d9c58a]/60 object-cover shadow-md"
                        />
                        <p className="mt-2 text-sm text-blue-700">
                          ذكرى جميلة ♥
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    اسحب الصور يمينًا أو يسارًا لمشاهدة الألبوم
                  </p>
                </div>

                <button
                  onClick={() => setStage(2)}
                  className="luxury-button mb-4 rounded-full px-5 py-2 text-sm text-blue-700 underline"
                >
                  العودة إلى الفيديو
                </button>
              </div>
            )}
          </section>
        )}

        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white px-4 py-2 text-xl text-black transition hover:bg-blue-100"
              aria-label="إغلاق الصورة"
            >
              ✕
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                setPhotoIndex(
                  (photoIndex - 1 + photos.length) % photos.length
                );
              }}
              className="absolute left-3 top-1/2 z-10 rounded-full bg-white/90 px-4 py-3 text-2xl text-black transition hover:bg-white"
              aria-label="الصورة السابقة"
            >
              ❮
            </button>

            <img
              src={photos[photoIndex]}
              alt={`صورة ${photoIndex + 1} من الألبوم`}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-[85vw] rounded-xl border border-[#d6b85a] object-contain elegant-reveal"
            />

            <button
              onClick={(event) => {
                event.stopPropagation();
                setPhotoIndex((photoIndex + 1) % photos.length);
              }}
              className="absolute right-3 top-1/2 z-10 rounded-full bg-white/90 px-4 py-3 text-2xl text-black transition hover:bg-white"
              aria-label="الصورة التالية"
            >
              ❯
            </button>

            <p className="absolute bottom-5 text-sm text-white">
              {photoIndex + 1} / {photos.length}
            </p>
          </div>
        )}

        <audio id="wedding-music" src="/music.mp3" loop preload="none" />

        <button
          onClick={toggleMusic}
          className="luxury-button fixed bottom-5 left-5 z-40 rounded-full border border-[#d6b85a] bg-gradient-to-l from-blue-950 to-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {musicPlaying ? "⏸ إيقاف الموسيقى" : "♫ تشغيل الموسيقى"}
        </button>

        <footer className="mt-8 pb-3 text-xs text-blue-500 elegant-reveal">
          <span className="text-[#b08d2e]">✧</span> Made with love ♥ Mahmoud & Mariam{" "}
          <span className="text-[#b08d2e]">✧</span>
        </footer>
      </div>
    </main>
  );
}
