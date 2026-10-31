"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // Door Entrance State
  const [doorStatus, setDoorStatus] = useState("locked"); // "locked" | "opening" | "opened"
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Envelope / Surprise Unlock state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef(null);

  // Relationship start date: 28 Dec 2024
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Love Reasons interactive cards
  const [revealedCard, setRevealedCard] = useState(null);

  // Proposal state
  const [proposalAnswer, setProposalAnswer] = useState(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  // Floating hearts count
  const [hearts, setHearts] = useState([]);

  // Memory timeline with real dates
  const memories = [
    {
      date: "28 December 2024",
      title: "যেদিন আমাদের ভালোবাসার সূচনা হলো",
      desc: "২০২৪ সালের ২৮শে ডিসেম্বর—যেদিন আমাদের দুটি হৃদয় এক হয়েছিল। আমাদের পবিত্র ভালোবাসার গল্প লেখার প্রথম ও শ্রেষ্ঠ দিন।",
      tag: "💖 Relationship Began",
    },
    {
      date: "Every Late Night & Midnight",
      title: "ঘুমহীন রাতের মিষ্টি আলাপ",
      desc: "রাত যখন গভীর হতো, আমাদের কথা ততই মধুর হতো। পৃথিবীর সব ক্লান্তি মুছে দিত তোমার মিষ্টি গলার একটা কথা।",
      tag: "🌙 Sweet Whispers",
    },
    {
      date: "Every Shared Dream & Promise",
      title: "একসাথে দেখা প্রতিটি স্বপ্ন",
      desc: "আমাদের স্বপ্নগুলো একে অপরের সাথে জুড়ে গেছে। প্রতিটি হাসিতে, প্রতিটি অনুভূতির প্রতিটি সেকেন্ডে শুধু তুমি আর তুমি।",
      tag: "✨ Pure Magic",
    },
    {
      date: "Today & Forever Beyond",
      title: "আজ এবং আমাদের অনন্ত ভবিষ্যৎ",
      desc: "যতদিন আকাশ থাকবে, যতদিন এই হৃদস্পন্দন থাকবে—আমার প্রতিটি মুহূর্তের নিঃশ্বাসে শুধু তোমার নাম থাকবে, বর্ষা।",
      tag: "💍 Forever & Always",
    },
  ];

  // Reasons Why Parvej Loves Borsha
  const reasons = [
    {
      id: 1,
      title: "তোমার মায়াবী হাসি",
      short: "Smile that brightens everything",
      detail: "তোমার এক টুকরো হাসি আমার সমস্ত খারাপ দিনকে এক নিমিষে ভালোবাসার আলোয় ভরিয়ে দেয়।",
      icon: "✨",
    },
    {
      id: 2,
      title: "তোমার নিষ্পাপ যত্ন",
      short: "The gentlest heart in this world",
      detail: "যেভাবে তুমি আমার খেয়াল রাখো, আমাকে ভালোবাসো—তা পৃথিবীর শ্রেষ্ঠ উপহার।",
      icon: "🌸",
    },
    {
      id: 3,
      title: "তুমি আমার সবচেয়ে বড় শক্তি",
      short: "My home, my anchor, my peace",
      detail: "যখন পুরো পৃথিবী বিপরীতে দাঁড়িয়ে থাকে, তখনও তোমার হাত ধরে মনে হয় আমি সবকিছু জয় করতে পারব।",
      icon: "💫",
    },
    {
      id: 4,
      title: "তোমার সাথে কাটানো প্রতিটা পল",
      short: "Every breath with you is a blessing",
      detail: "তোমার সাথে থাকা মানে মনে হয় সময় থমকে যাক, এই ভালোবাসার আর কোনো শেষ না থাকুক।",
      icon: "🌹",
    },
  ];

  // Initialize floating hearts
  useEffect(() => {
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 7 + 6,
      delay: Math.random() * 5,
      char: ["❤️", "💖", "✨", "💕", "🌸"][Math.floor(Math.random() * 5)],
    }));
    setHearts(generated);
  }, []);

  // Love timer calculation from December 28, 2024
  useEffect(() => {
    const startDate = new Date("2024-12-28T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Soft romantic chime synthesizer using Web Audio API
  const playRomanticChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.16);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + idx * 0.16 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.16 + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.16);
        osc.stop(ctx.currentTime + idx * 0.16 + 2.0);
      });
      setIsPlayingAudio(true);
    } catch {
      // Audio fallback
    }
  };

  const triggerCelebration = () => {
    playRomanticChime();
    createParticleBurst();
  };

  const createParticleBurst = () => {
    const container = document.body;
    for (let i = 0; i < 35; i++) {
      const p = document.createElement("div");
      p.innerText = ["❤️", "💖", "🌸", "✨", "💍", "🌹"][Math.floor(Math.random() * 6)];
      p.style.position = "fixed";
      p.style.left = "50vw";
      p.style.top = "50vh";
      p.style.fontSize = Math.random() * 20 + 16 + "px";
      p.style.pointerEvents = "none";
      p.style.zIndex = "9999";
      p.style.transition = "all 1.6s cubic-bezier(0.1, 0.8, 0.3, 1)";
      container.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 280 + 70;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`;
        p.style.opacity = "0";
      });

      setTimeout(() => {
        p.remove();
      }, 1700);
    }
  };

  const handleDoorUnlock = (e) => {
    e?.preventDefault();
    if (enteredPassword.trim().toLowerCase() === "boldi143") {
      setPasswordError(false);
      setDoorStatus("opening");
      triggerCelebration();
      setTimeout(() => {
        setDoorStatus("opened");
      }, 1500);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 800);
    }
  };

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 180;
    const randomY = (Math.random() - 0.5) * 120;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <main className="app-container">
      {/* 3D MAGICAL DOOR ENTRANCE OVERLAY */}
      {doorStatus !== "opened" && (
        <div className={`door-overlay ${doorStatus}`}>
          <div className="door-wrapper">
            <div className="door-frame">
              <div className="door-leaf left">
                <div style={{ fontSize: "2.5rem", opacity: 0.7 }}>🌹</div>
              </div>
              <div className="door-leaf right">
                <div style={{ fontSize: "2.5rem", opacity: 0.7 }}>✨</div>
              </div>
            </div>

            {/* Lock Modal Card */}
            {doorStatus === "locked" && (
              <div className={`door-lock-card ${passwordError ? "shake" : ""}`}>
                <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔐</div>
                <h2
                  className="gradient-text"
                  style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "8px" }}
                >
                  Secret Love Portal
                </h2>
                <p style={{ color: "#d9a7c7", fontSize: "0.9rem", marginBottom: "20px" }}>
                  শুধুমাত্র বর্ষার জন্য সংরক্ষিত। প্রবেশের জন্য বিশেষ পাসওয়ার্ডটি লিখুন ❤️
                </p>

                <form onSubmit={handleDoorUnlock}>
                  <input
                    type="password"
                    placeholder="Enter Secret Password..."
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    autoFocus
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "50px",
                      border: passwordError
                        ? "2px solid #ff3366"
                        : "1.5px solid rgba(255, 140, 190, 0.4)",
                      background: "rgba(10, 4, 20, 0.7)",
                      color: "#fff",
                      fontSize: "1rem",
                      textAlign: "center",
                      outline: "none",
                      marginBottom: "14px",
                    }}
                  />

                  {passwordError && (
                    <p style={{ color: "#ff4d6d", fontSize: "0.82rem", marginBottom: "12px" }}>
                      ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিয়ে দরজা খুলুন 🥺
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-romance"
                    style={{ width: "100%", padding: "12px 20px" }}
                  >
                    ✨ Unlock The Door ✨
                  </button>
                </form>

                <p
                  style={{
                    color: "#a48099",
                    fontSize: "0.78rem",
                    marginTop: "16px",
                    fontStyle: "italic",
                  }}
                >
                  Hint: পারভেজের দেওয়া বিশেষ ডাকনাম + 143
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic ambient floating orbs */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Floating Hearts background */}
      <div className="floating-elements">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {h.char}
          </span>
        ))}
      </div>

      {/* Music / Melody Control Button */}
      <button
        id="audio-melody-toggle"
        onClick={() => {
          playRomanticChime();
          setIsPlayingAudio(!isPlayingAudio);
        }}
        className="audio-toggle-btn"
        title="Play romantic melody"
      >
        <span style={{ fontSize: "1.1rem" }}>{isPlayingAudio ? "🎵" : "🎶"}</span>
        <span>{isPlayingAudio ? "Melody On" : "Play Melody"}</span>
        {isPlayingAudio && (
          <div className="audio-pulse">
            <span />
            <span />
            <span />
          </div>
        )}
      </button>

      {/* HERO SECTION */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "70px 16px 40px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Floating badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "50px",
            background: "rgba(255, 77, 141, 0.15)",
            border: "1px solid rgba(255, 120, 170, 0.35)",
            backdropFilter: "blur(10px)",
            marginBottom: "18px",
            boxShadow: "0 4px 15px rgba(255, 77, 141, 0.15)",
          }}
        >
          <span style={{ animation: "pulse 1.5s infinite" }}>💖</span>
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffb4d6",
              textTransform: "uppercase",
            }}
          >
            Since 28 December 2024
          </span>
        </div>

        {/* Romantic Main Heading */}
        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "14px",
            letterSpacing: "-0.02em",
            maxWidth: "900px",
          }}
        >
          To My Beloved <span className="gradient-text">Borsha</span>,
        </h1>

        <p
          className="script-font"
          style={{
            fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
            color: "#ffd166",
            marginBottom: "18px",
            textShadow: "0 0 20px rgba(255, 209, 102, 0.4)",
          }}
        >
          From Parvej With Infinite Love
        </p>

        <p
          style={{
            maxWidth: "650px",
            fontSize: "clamp(0.98rem, 1.8vw, 1.2rem)",
            color: "#f3d2e6",
            lineHeight: 1.7,
            marginBottom: "36px",
            padding: "0 8px",
          }}
        >
          আমার জীবনের প্রতিটি সুন্দর মুহূর্তে তোমার উপস্থিতি এক আশীর্বাদ। তুমি আমার নীরব রাতের গান, 
          আমার প্রতিটা ভোরের মিষ্টি রোদ। আজকের এই ছোট সারপ্রাইজটি শুধু তোমার মুখের হাসির জন্য!
        </p>

        {/* Envelope Interaction trigger */}
        {!isUnlocked ? (
          <div
            onClick={() => {
              setIsUnlocked(true);
              triggerCelebration();
            }}
            style={{
              cursor: "pointer",
              perspective: "1000px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: "16px",
                borderRadius: "28px",
                position: "relative",
                transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              <div
                className="envelope-wrapper"
                style={{
                  position: "relative",
                  width: "270px",
                  height: "270px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src="/envelope.jpg"
                  alt="Magical Love Envelope for Borsha"
                  fill
                  sizes="(max-width: 768px) 240px, 270px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Glowing wax seal badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "26px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  color: "#fff",
                  padding: "8px 20px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  boxShadow: "0 6px 20px rgba(255, 65, 108, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                <span>💌 Click to Open Borsha&apos;s Letter</span>
              </div>
            </div>
            <p style={{ color: "#e4b6d4", fontSize: "0.9rem", fontStyle: "italic" }}>
              (চিঠির খামে ট্যাপ করে সারপ্রাইজটি আনলক করো ❤️)
            </p>
          </div>
        ) : (
          /* UNLOCKED LOVE LETTER MODAL */
          <div
            className="glass-panel letter-box"
            style={{
              maxWidth: "760px",
              width: "100%",
              padding: "36px 30px",
              background: "linear-gradient(135deg, rgba(32, 16, 52, 0.95), rgba(48, 18, 70, 0.95))",
              border: "1.5px solid rgba(255, 140, 190, 0.5)",
              boxShadow: "0 20px 60px rgba(255, 65, 108, 0.25)",
              animation: "fadeIn 0.6s ease forwards",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px dashed rgba(255, 150, 190, 0.3)",
                paddingBottom: "14px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <span className="script-font" style={{ fontSize: "1.9rem", color: "#ffd166" }}>
                  Dearest Borsha,
                </span>
                <p style={{ fontSize: "0.82rem", color: "#d9a7c7", marginTop: "2px" }}>
                  Written with all my heart • From Parvej
                </p>
              </div>
              <button
                onClick={triggerCelebration}
                style={{
                  background: "rgba(255, 77, 141, 0.2)",
                  border: "1px solid rgba(255, 77, 141, 0.4)",
                  color: "#ff94c2",
                  borderRadius: "50px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                🎉 Shower Love
              </button>
            </div>

            <div
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#ffebf5",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <p>
                প্রিয় বর্ষা, তুমি আমার জীবনে আসা সেই অদ্ভুত সুন্দর বৃষ্টি, যা আমার সমস্ত রুক্ষতাকে মুছে দিয়ে 
                হৃদয়কে একরাশ সজীবতায় ভরিয়ে দিয়েছে। ২০২৪ সালের ২৮শে ডিসেম্বর থেকে শুরু হওয়া আমাদের এই যাত্রা 
                আমার জীবনের শ্রেষ্ঠ উপহার।
              </p>
              <p>
                যখনই তোমার কথা মনে পড়ে, নিজের অজান্তেই মুখে এক চিলতে হাসি চলে আসে। তোমার রাগ, তোমার অভিমান, 
                তোমার পাগলামি—সবকিছুই আমার কাছে পৃথিবীর সবচেয়ে মূল্যবান সম্পদ। 
              </p>
              <p>
                আমি হয়তো পৃথিবীর সব ধন-সম্পদ দিতে পারব না, কিন্তু কথা দিচ্ছি—জীবনের শেষ নিঃশ্বাস পর্যন্ত 
                তোমায় নিঃশর্ত ভালোবাসবো, আগলে রাখবো এবং তোমার চোখের কোণে কখনো অশ্রু জমতে দেব না।
              </p>
            </div>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingTop: "18px",
                borderTop: "1px dashed rgba(255, 150, 190, 0.3)",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div>
                <p style={{ fontSize: "0.85rem", color: "#d9a7c7" }}>Forever & Always Yours,</p>
                <p className="script-font" style={{ fontSize: "2.2rem", color: "#ff8fa3" }}>
                  Parvej ❤️
                </p>
              </div>

              <button
                onClick={() => {
                  const target = document.getElementById("reasons-section");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-romance"
                style={{ padding: "10px 20px", fontSize: "0.9rem" }}
              >
                Our Journey ↓
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SPECIAL BIRTHDAYS CARD DISPLAY */}
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          padding: "10px 16px 40px",
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: "30px 24px",
            background: "linear-gradient(135deg, rgba(30, 12, 50, 0.75), rgba(46, 16, 70, 0.75))",
            textAlign: "center",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "#ffd166",
              fontWeight: 700,
            }}
          >
            Special Star Dates
          </span>
          <h2 style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", fontWeight: 800, marginTop: "6px", marginBottom: "24px" }}>
            The Days Two Souls Were Born
          </h2>

          <div
            className="birthdays-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {/* Borsha's Birthday */}
            <div
              style={{
                background: "rgba(255, 77, 141, 0.12)",
                border: "1.5px solid rgba(255, 120, 180, 0.4)",
                borderRadius: "22px",
                padding: "24px 16px",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>🎂🌸</div>
              <span style={{ fontSize: "0.85rem", color: "#ff94c2", fontWeight: 700, textTransform: "uppercase" }}>
                Her Special Day
              </span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "4px 0" }}>
                22 June
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#ffd166", fontWeight: 700 }}>
                Borsha&apos;s Birthday
              </p>
              <p style={{ fontSize: "0.85rem", color: "#e4bed7", marginTop: "6px" }}>
                যেদিন পৃথিবীতে আমার সুখের বৃষ্টি নেমেছিল ✨
              </p>
            </div>

            {/* Parvej's Birthday */}
            <div
              style={{
                background: "rgba(138, 43, 226, 0.15)",
                border: "1.5px solid rgba(180, 120, 255, 0.4)",
                borderRadius: "22px",
                padding: "24px 16px",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>👑✨</div>
              <span style={{ fontSize: "0.85rem", color: "#c894ff", fontWeight: 700, textTransform: "uppercase" }}>
                His Special Day
              </span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "4px 0" }}>
                12 January
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#ffd166", fontWeight: 700 }}>
                Parvej&apos;s Birthday
              </p>
              <p style={{ fontSize: "0.85rem", color: "#e4bed7", marginTop: "6px" }}>
                যে মানুষটি বর্ষাকে নিজের চেয়েও বেশি ভালোবাসে ❤️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOVE COUNTER DISPLAY FROM 28 DEC 2024 */}
      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          padding: "20px 16px 50px",
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: "32px 20px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(28, 12, 48, 0.7), rgba(40, 15, 60, 0.7))",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              color: "#ff94c2",
              fontWeight: 700,
            }}
          >
            Since 28 December 2024
          </span>
          <h2
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.7rem)",
              fontWeight: 700,
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Our Infinite Love Journey
          </h2>

          <div
            className="counter-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { val: timeTogether.days, unit: "Days of Love" },
              { val: timeTogether.hours, unit: "Hours Together" },
              { val: timeTogether.minutes, unit: "Minutes Treasured" },
              { val: timeTogether.seconds, unit: "Seconds of Joy" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="counter-item"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 140, 180, 0.2)",
                  borderRadius: "20px",
                  padding: "18px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="gold-gradient-text"
                  style={{
                    fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {stat.val}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#e2b8d6",
                    marginTop: "6px",
                    fontWeight: 500,
                  }}
                >
                  {stat.unit}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "20px",
              color: "#d0a2c0",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            “২৮ ডিসেম্বর ২০২৪ থেকে প্রতিটা নিঃশ্বাস শুধু তোমার নামে, বর্ষা।”
          </p>
        </div>
      </section>

      {/* REASONS WHY PARVEJ LOVES BORSHA */}
      <section
        id="reasons-section"
        style={{
          width: "100%",
          maxWidth: "1150px",
          padding: "40px 16px 60px",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span
            style={{
              background: "rgba(255, 105, 180, 0.15)",
              color: "#ff85b3",
              padding: "5px 16px",
              borderRadius: "50px",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Heartfelt Confessions
          </span>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 800,
              marginTop: "10px",
              color: "#fff",
            }}
          >
            কেন বর্ষাকে এত ভালোবাসি?
          </h2>
          <p style={{ color: "#d8a8c8", marginTop: "6px", fontSize: "0.95rem" }}>
            Tap on any card to reveal Parvej&apos;s personal words for you
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {reasons.map((r) => {
            const isSelected = revealedCard === r.id;
            return (
              <div
                key={r.id}
                onClick={() => {
                  setRevealedCard(isSelected ? null : r.id);
                  triggerCelebration();
                }}
                className="glass-panel"
                style={{
                  padding: "26px 20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  borderColor: isSelected ? "#ff6ea7" : "var(--border-glow)",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(60, 20, 80, 0.9), rgba(40, 12, 60, 0.9))"
                    : "var(--bg-card)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.3rem",
                    marginBottom: "12px",
                    filter: "drop-shadow(0 4px 10px rgba(255, 110, 167, 0.5))",
                  }}
                >
                  {r.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: "6px",
                    color: "#fff",
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#dfb0cf",
                    lineHeight: 1.5,
                  }}
                >
                  {r.short}
                </p>

                {isSelected && (
                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px dashed rgba(255, 150, 190, 0.3)",
                      fontSize: "0.95rem",
                      color: "#ffe0f0",
                      lineHeight: 1.6,
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    {r.detail}
                  </div>
                )}

                <span
                  style={{
                    marginTop: "14px",
                    fontSize: "0.78rem",
                    color: isSelected ? "#ff75a0" : "#a8819d",
                    fontWeight: 600,
                  }}
                >
                  {isSelected ? "Tap to close ↑" : "Tap to open ✨"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROMANTIC MEMORY TIMELINE */}
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          padding: "30px 16px 70px",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              background: "rgba(255, 105, 180, 0.15)",
              color: "#ff85b3",
              padding: "5px 16px",
              borderRadius: "50px",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Milestones of Us
          </span>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
              fontWeight: 800,
              marginTop: "10px",
              color: "#fff",
            }}
          >
            আমাদের ভালোবাসার গল্প
          </h2>
        </div>

        <div className="timeline-container">
          <div className="timeline-line" />

          <div>
            {memories.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`timeline-item ${isEven ? "left" : "right"}`}
                >
                  <div className="timeline-node" />

                  <div className="glass-panel timeline-card">
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        color: "#ffd166",
                        background: "rgba(255, 209, 102, 0.15)",
                        padding: "4px 10px",
                        borderRadius: "50px",
                        marginBottom: "8px",
                      }}
                    >
                      {m.tag}
                    </span>
                    <h3
                      style={{
                        fontSize: "1.18rem",
                        fontWeight: 700,
                        marginBottom: "4px",
                        color: "#fff",
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#ff94c2",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}
                    >
                      {m.date}
                    </p>
                    <p style={{ fontSize: "0.92rem", color: "#e6c8dc", lineHeight: 1.6 }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIAL GIFT PRESENTATION */}
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          padding: "20px 16px 60px",
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel gift-container"
          style={{
            padding: "36px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(35, 14, 55, 0.8), rgba(50, 16, 75, 0.8))",
          }}
        >
          <div
            className="gift-image-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "340px",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/roses.jpg"
              alt="Crimson Glowing Rose Bouquet for Borsha"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div>
            <span
              style={{
                background: "rgba(255, 117, 140, 0.15)",
                color: "#ff758c",
                padding: "5px 14px",
                borderRadius: "50px",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Eternal Gift
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)",
                fontWeight: 800,
                marginTop: "10px",
                marginBottom: "12px",
                color: "#fff",
              }}
            >
              A Thousand Roses Just For You
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#f3d3ea",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              গোলাপগুলো একসময় শুকিয়ে যেতে পারে, কিন্তু বর্ষার প্রতি পারভেজের ভালোবাসা দিন দিন 
              আরও প্রস্ফুটিত হবে। তুমি আমার জীবনের সেই ফুল যা কখনো ম্লান হবে না।
            </p>
            <button
              onClick={() => {
                triggerCelebration();
                alert("🌹 পারভেজ তোমাকে হৃদয়ের গভীর থেকে এক গুচ্ছ ভালোবাসার গোলাপ উপহার দিলো!");
              }}
              className="btn-romance"
            >
              🌹 Accept Virtual Roses
            </button>
          </div>
        </div>
      </section>

      {/* FINAL PROPOSAL / INTERACTIVE LOVE QUESTION */}
      <section
        style={{
          width: "100%",
          maxWidth: "850px",
          padding: "30px 16px 90px",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <div
          className="glass-panel proposal-box"
          style={{
            padding: "45px 24px",
            background: "linear-gradient(135deg, rgba(38, 14, 58, 0.9), rgba(56, 18, 80, 0.9))",
            border: "2px solid rgba(255, 110, 180, 0.4)",
            boxShadow: "0 25px 60px rgba(255, 77, 141, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ fontSize: "3.2rem", marginBottom: "14px" }}>💍</div>
          <h2
            className="gradient-text"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Borsha, Will You Stay With Me Forever?
          </h2>
          <p
            style={{
              fontSize: "1.08rem",
              color: "#e6c8dc",
              maxWidth: "540px",
              margin: "0 auto 30px",
              lineHeight: 1.6,
            }}
          >
            আমার সমস্ত সুখ আর দুঃখে, সব হাসিতে আর কান্নায়—আমার হাত ধরে সারাজীবন পাশে থাকবে তো?
          </p>

          {proposalAnswer === "yes" ? (
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 77, 141, 0.2)",
                borderRadius: "20px",
                border: "1px solid #ff758c",
                animation: "fadeIn 0.5s ease",
              }}
            >
              <h3 className="gold-gradient-text" style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                YAY! I Love You So Much, Borsha! ❤️✨
              </h3>
              <p style={{ marginTop: "8px", fontSize: "1.05rem", color: "#ffebf5" }}>
                পারভেজ আর বর্ষার এই ভালোবাসার গল্প চিরকাল অমর হয়ে থাকবে! 💑💖
              </p>
            </div>
          ) : (
            <div
              className="proposal-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                position: "relative",
                minHeight: "70px",
              }}
            >
              <button
                id="proposal-yes-btn"
                onClick={() => {
                  setProposalAnswer("yes");
                  triggerCelebration();
                }}
                className="btn-romance"
                style={{
                  fontSize: "1.1rem",
                  padding: "14px 38px",
                  boxShadow: "0 10px 30px rgba(255, 77, 141, 0.6)",
                }}
              >
                YES, Forever! 💖
              </button>

              <button
                id="proposal-no-btn"
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                onTouchStart={moveNoButton}
                className="btn-secondary"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: "transform 0.15s ease-out",
                  position: "relative",
                  userSelect: "none",
                }}
              >
                No way 🙈
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          width: "100%",
          padding: "24px 16px 36px",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 10,
          color: "#9f7d97",
          fontSize: "0.88rem",
        }}
      >
        <p>
          Crafted with endless love by <span style={{ color: "#ff8fa3", fontWeight: 700 }}>Parvej</span> for his one and only{" "}
          <span style={{ color: "#ffd166", fontWeight: 700 }}>Borsha</span> ❤️
        </p>
        <p style={{ fontSize: "0.8rem", marginTop: "4px", opacity: 0.8 }}>
          Parvej &amp; Borsha • A Forever Love Story
        </p>
      </footer>
    </main>
  );
}
