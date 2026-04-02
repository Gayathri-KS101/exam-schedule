import { useState } from "react";

const timetableData = [
  { date: "24-04-2026", day: "Friday",    slot: "A FN", code: "ITT302",  subject: "IWT",            sem: "S6", full: "Internet Working with tcp/ip" },
  { date: "28-04-2026", day: "Tuesday",   slot: "B FN", code: "ITT304",  subject: "AAD",            sem: "S6", full: "Algorithm Analysis & Design" },
  { date: "02-05-2026", day: "Saturday",  slot: "C FN", code: "ITT306",  subject: "DS",             sem: "S6", full: "Data Science" },
  { date: "05-05-2026", day: "Tuesday",   slot: "D FN", code: "ITTXXX",  subject: "Soft Computing", sem: "S6", full: "Program Elective-I" },
  { date: "08-05-2026", day: "Friday",    slot: "E FN", code: "HUT300",  subject: "IEFT",           sem: "S6", full: "Industrial Eco & Foreign Trade" },
  { date: "12-05-2026", day: "Tuesday",   slot: "F FN", code: "ITT308",  subject: "Comprehensive",  sem: "S6", full: "Comprehensive Exam" },
  { date: "13-05-2026", day: "Wednesday", slot: "A AN", code: "MAT208",  subject: "MATHS",          sem: "S4", full: "Mathematics" },
  { date: "18-05-2026", day: "Monday",    slot: "C AN", code: "ITT204",  subject: "CO",             sem: "S4", full: "Computer Organization" },
  { date: "03-06-2026", day: "Wednesday", slot: "B FN", code: "ITT303",  subject: "OS",             sem: "S5", full: "Operating Systems" },
  { date: "08-06-2026", day: "Monday",    slot: "D FN", code: "ITT307",  subject: "FLAT",           sem: "S5", full: "Formal Languages & Automata Theory" },
  { date: "10-06-2026", day: "Wednesday", slot: "E FN", code: "ITT309",  subject: "MSE",            sem: "S5", full: "Management of Software Engineers" },
];

const semColors = {
  S4: { badge: "#FF6B00" },
  S5: { badge: "#1B5E20" },
  S6: { badge: "#0D47A1" },
};

const getDaysUntil = (dateStr) => {
  const [d, m, y] = dateStr.split("-").map(Number);
  const exam = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
};

export default function KTUTimetable() {
  const [filter, setFilter] = useState("ALL");
  const [hoveredRow, setHoveredRow] = useState(null);

  const filtered = filter === "ALL" ? timetableData : timetableData.filter(e => e.sem === filter);

  const nextExam = timetableData.find(e => getDaysUntil(e.date) >= 0);
  const daysToNext = nextExam ? getDaysUntil(nextExam.date) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "32px 16px",
      color: "#fff",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          padding: "4px 18px",
          fontSize: 11,
          letterSpacing: 4,
          color: "#a78bfa",
          marginBottom: 14,
          textTransform: "uppercase",
        }}>
          KTU · 2019 Scheme · B.Tech IT
        </div>
        <h1 style={{
          fontSize: "clamp(24px, 6vw, 44px)",
          fontWeight: 700,
          margin: "0 0 8px",
          letterSpacing: -1,
          background: "linear-gradient(90deg, #e0c3fc, #8ec5fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Exam Timetable 2026
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
          S4 · S5 · S6 — Selected Subjects Only
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 28,
      }}>
        {[
          { label: "Total Exams", value: timetableData.length },
          { label: "Next Exam In", value: daysToNext !== null ? `${daysToNext}d` : "—" },
          { label: "Next Subject", value: nextExam?.subject || "—" },
          { label: "Semesters", value: "S4 S5 S6" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "12px 24px",
            textAlign: "center",
            minWidth: 100,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#e0c3fc" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginBottom: 28,
        flexWrap: "wrap",
      }}>
        {Object.entries(semColors).map(([sem, c]) => (
          <div key={sem} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: c.badge, width: 28, height: 16, borderRadius: 4, display: "inline-block" }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{sem}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#fbbf24", fontSize: 13 }}>★ Today</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#f87171", fontSize: 13 }}>⚠ Due Soon (≤3 days)</span>
        </div>
      </div>

      {/* Inline Table Card */}
      <div style={{
        background: "#1a1733",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        width: "100%",
        maxWidth: 860,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        position: "relative",
        zIndex: 9999,
      }}>

        {/* Card Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e0c3fc" }}>
            KTU Exam Timetable 2026
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            S4 · S5 · S6 — B.Tech IT · 2019 Scheme
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          gap: 8,
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          {["ALL", "S4", "S5", "S6"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 20px",
                borderRadius: 999,
                border: filter === f ? "none" : "1px solid rgba(255,255,255,0.15)",
                background: filter === f
                  ? "linear-gradient(135deg, #a78bfa, #60a5fa)"
                  : "rgba(255,255,255,0.05)",
                color: filter === f ? "#fff" : "#94a3b8",
                fontWeight: filter === f ? 700 : 400,
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: 1,
                transition: "all 0.2s",
                fontFamily: "'Georgia', serif",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Scrollable Table Area */}
        <div style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: 420,
          WebkitOverflowScrolling: "touch",
        }}>
          {/* Sticky Column Headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "140px 80px 100px 130px 260px 65px",
            minWidth: 780,
            padding: "12px 20px",
            fontSize: 11,
            letterSpacing: 2,
            color: "#a78bfa",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Georgia', serif",
            background: "#1a1733",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <span>Date</span>
            <span>Slot</span>
            <span>Code</span>
            <span>Subject</span>
            <span>Full Name</span>
            <span style={{ textAlign: "center" }}>Sem</span>
          </div>

          {/* Rows */}
          {filtered.map((exam, i) => {
            const daysLeft = getDaysUntil(exam.date);
            const isPast = daysLeft < 0;
            const isToday = daysLeft === 0;
            const isSoon = daysLeft >= 0 && daysLeft <= 3;
            const colors = semColors[exam.sem];

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 80px 100px 130px 260px 65px",
                  minWidth: 780,
                  padding: "14px 20px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: hoveredRow === i
                    ? "rgba(167,139,250,0.08)"
                    : isPast
                    ? "rgba(0,0,0,0.15)"
                    : "transparent",
                  transition: "background 0.2s",
                  opacity: isPast ? 0.45 : 1,
                  alignItems: "center",
                  cursor: "default",
                }}
              >
                {/* Date */}
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isToday ? "#fbbf24" : isSoon ? "#f87171" : "#e2e8f0",
                  }}>
                    {exam.date}
                  </div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{exam.day}</div>
                  {isToday && (
                    <div style={{
                      display: "inline-block",
                      background: "#fbbf24",
                      color: "#000",
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 999,
                      letterSpacing: 1,
                      marginTop: 3,
                    }}>TODAY</div>
                  )}
                  {isSoon && !isToday && (
                    <div style={{
                      display: "inline-block",
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 999,
                      letterSpacing: 1,
                      marginTop: 3,
                    }}>{daysLeft}D LEFT</div>
                  )}
                </div>

                {/* Slot */}
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", fontFamily: "monospace" }}>
                  {exam.slot}
                </div>

                {/* Code */}
                <div style={{ fontSize: 12, color: "#60a5fa", fontFamily: "monospace", fontWeight: 600 }}>
                  {exam.code}
                </div>

                {/* Subject */}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>
                  {exam.subject}
                </div>

                {/* Full Name */}
                <div style={{ fontSize: 12, color: "#64748b", paddingRight: 12 }}>
                  {exam.full}
                </div>

                {/* Sem Badge */}
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    display: "inline-block",
                    background: colors.badge,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                    letterSpacing: 0.5,
                  }}>
                    {exam.sem}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Footer */}
        <div style={{
          padding: "10px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          fontSize: 11,
          color: "#334155",
        }}>
          <span>Showing {filtered.length} of {timetableData.length} exams</span>
          <span>KTU Exam Calendar · 02/03/2026 · KTUMAGIC</span>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        textAlign: "center",
        color: "#334155",
        fontSize: 12,
        marginTop: 32,
        letterSpacing: 1,
      }}>
        Based on KTU Exam Calendar published 02/03/2026 · via KTUMAGIC
      </p>

    </div>
  );
}